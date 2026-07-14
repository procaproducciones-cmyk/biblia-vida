'use strict';

const fs = require('fs');
const path = require('path');

const [inputFile, outputFile, baseFile] = process.argv.slice(2);
if (!inputFile || !outputFile || !baseFile) {
  console.error('Uso: node scripts/preparar-biblia-oso.js <api.json> <salida.json> <biblia-base.json>');
  process.exit(1);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function firstNumber(obj, keys) {
  for (const key of keys) {
    const value = obj?.[key];
    if (value !== undefined && value !== null && value !== '') {
      const number = Number(value);
      if (Number.isFinite(number) && number > 0) return number;
    }
  }
  return 0;
}

function firstString(obj, keys) {
  for (const key of keys) {
    const value = obj?.[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function normalizeKey(key) {
  return String(key || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function detectRole(key) {
  const normalized = normalizeKey(key);
  if (['books', 'booklist', 'libros'].includes(normalized)) return 'books';
  if (['chapters', 'chapterlist', 'capitulos'].includes(normalized)) return 'chapters';
  if (['verses', 'verselist', 'versiculos'].includes(normalized)) return 'verses';
  return null;
}

function cleanText(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, '')
    .replace(/\\(?:par|line|br)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeForCheck(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9ñ\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const payload = readJson(inputFile);
const baseBible = readJson(baseFile);
if (!Array.isArray(baseBible.books) || baseBible.books.length !== 66) {
  throw new Error('La Biblia base no contiene los 66 libros esperados.');
}

const grouped = new Map();
let discoveredVerses = 0;

function storeVerse(bookNr, chapterNr, verseNr, text, bookName = '') {
  const cleaned = cleanText(text);
  if (!bookNr || !chapterNr || !verseNr || !cleaned) return;

  if (!grouped.has(bookNr)) grouped.set(bookNr, { name: bookName, chapters: new Map() });
  const book = grouped.get(bookNr);
  if (!book.name && bookName) book.name = bookName;
  if (!book.chapters.has(chapterNr)) book.chapters.set(chapterNr, new Map());
  const chapter = book.chapters.get(chapterNr);
  if (!chapter.has(verseNr)) discoveredVerses += 1;
  chapter.set(verseNr, cleaned);
}

function walk(value, context = {}, role = null, seen = new WeakSet()) {
  if (value === null || value === undefined) return;

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const next = { ...context };
      if (role === 'books' && !next.bookNr) next.bookNr = index + 1;
      if (role === 'chapters' && !next.chapterNr) next.chapterNr = index + 1;
      if (role === 'verses' && !next.verseNr) next.verseNr = index + 1;
      walk(item, next, null, seen);
    });
    return;
  }

  if (typeof value !== 'object') return;
  if (seen.has(value)) return;
  seen.add(value);

  const explicitBookNr = firstNumber(value, ['book_nr', 'book_number', 'bookNumber', 'book_no', 'bookNo']);
  const explicitChapterNr = firstNumber(value, ['chapter', 'chapter_nr', 'chapter_number', 'chapterNumber', 'chapter_no', 'chapterNo']);
  const explicitVerseNr = firstNumber(value, ['verse', 'verse_nr', 'verse_number', 'verseNumber', 'verse_no', 'verseNo']);

  const nextContext = {
    ...context,
    bookNr: explicitBookNr || context.bookNr || 0,
    chapterNr: explicitChapterNr || context.chapterNr || 0,
    verseNr: explicitVerseNr || context.verseNr || 0,
    bookName: firstString(value, ['book_name', 'bookName']) || context.bookName || ''
  };

  const verseText = firstString(value, ['text', 'verse_text', 'verseText', 'content']);
  if (verseText && nextContext.bookNr && nextContext.chapterNr && nextContext.verseNr) {
    storeVerse(
      nextContext.bookNr,
      nextContext.chapterNr,
      nextContext.verseNr,
      verseText,
      nextContext.bookName
    );
  }

  for (const [key, child] of Object.entries(value)) {
    if (['text', 'verse_text', 'verseText', 'content'].includes(key)) continue;
    const childRole = detectRole(key);
    let childContext = { ...nextContext };

    if (/^\d+$/.test(key)) {
      const number = Number(key);
      if (role === 'books') childContext.bookNr = number;
      if (role === 'chapters') childContext.chapterNr = number;
      if (role === 'verses') childContext.verseNr = number;
    }

    walk(child, childContext, childRole, seen);
  }
}

walk(payload);

if (discoveredVerses < 30000) {
  throw new Error(`Solo se encontraron ${discoveredVerses} versículos. La fuente llegó incompleta o cambió de formato.`);
}

let chapterCount = 0;
let verseCount = 0;
const books = baseBible.books.map((baseBook, index) => {
  const bookNr = index + 1;
  const sourceBook = grouped.get(bookNr);
  if (!sourceBook) throw new Error(`Falta el libro ${bookNr}: ${baseBook.name}.`);

  const expectedChapters = baseBook.chapters.length;
  const chapters = [];

  for (let chapterNr = 1; chapterNr <= expectedChapters; chapterNr += 1) {
    const sourceChapter = sourceBook.chapters.get(chapterNr);
    if (!sourceChapter) throw new Error(`Falta ${baseBook.name} ${chapterNr}.`);

    const maxVerse = Math.max(...sourceChapter.keys());
    const verses = [];
    for (let verseNr = 1; verseNr <= maxVerse; verseNr += 1) {
      const text = sourceChapter.get(verseNr);
      if (!text) throw new Error(`Falta ${baseBook.name} ${chapterNr}:${verseNr}.`);
      verses.push(text);
      verseCount += 1;
    }
    chapters.push(verses);
    chapterCount += 1;
  }

  return {
    id: baseBook.id,
    name: sourceBook.name || baseBook.name,
    testament: baseBook.testament,
    chapters
  };
});

if (books.length !== 66) throw new Error(`Se generaron ${books.length} libros en vez de 66.`);
if (chapterCount !== 1189) throw new Error(`Se generaron ${chapterCount} capítulos en vez de 1189.`);
if (verseCount < 30000) throw new Error(`Se generaron solo ${verseCount} versículos.`);

const genesis11 = books[0]?.chapters?.[0]?.[0] || '';
const genesisCheck = normalizeForCheck(genesis11);
if (!genesisCheck.includes('en el principio creo dios')) {
  throw new Error(`Génesis 1:1 no corresponde a la edición esperada con ortografía actualizada: "${genesis11}"`);
}

const output = {
  metadata: {
    name: 'Biblia del Oso 1569',
    abbreviation: 'Oso 1569',
    source: 'GetBible API v2',
    sourceCatalogName: 'Sagradas Escrituras (1569)',
    sourceDescription: 'Sagradas Escrituras Versión Antigua (1569), edición digital de lectura con ortografía actualizada.',
    editorialNotice: 'Edición digital de lectura. No se presenta como facsímil ni como transcripción letra por letra de la impresión de 1569.',
    sourceLicense: 'Public Domain',
    sourceUrl: 'https://api.getbible.net/v2/sse.json',
    generatedAt: new Date().toISOString(),
    books: books.length,
    chapters: chapterCount,
    verses: verseCount,
    validation: {
      genesis1_1: genesis11
    }
  },
  books
};

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(output));

const sizeMb = fs.statSync(outputFile).size / 1024 / 1024;
console.log(`Biblia del Oso preparada: ${books.length} libros, ${chapterCount} capítulos, ${verseCount} versículos, ${sizeMb.toFixed(1)} MB.`);
console.log(`Génesis 1:1: ${genesis11}`);
