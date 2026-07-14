'use strict';

const STORAGE = {
  settings: 'bv_settings',
  favorites: 'bv_favorites',
  notes: 'bv_notes',
  lastRead: 'bv_last_read',
  welcomed: 'bv_welcomed'
};

const BIBLE_DB = { name: 'biblia_vida_textos', version: 1, store: 'versions' };
const OSO1569_CACHE_KEY = 'oso1569-getbible-sse-v1';
const LEGACY_OSO1569_CACHE_KEY = 'rv1865-getbible-v1';

const BIBLE_VERSIONS = {
  rv1909: {
    id: 'rv1909',
    shortName: 'RVR 1909',
    name: 'Reina-Valera 1909',
    icon: '📘',
    source: 'local',
    path: 'data/biblia-rv1909.json',
    description: 'Versión clásica en español incluida dentro de la aplicación.'
  },
  oso1569: {
    id: 'oso1569',
    shortName: 'Oso 1569',
    name: 'Biblia del Oso 1569',
    icon: '🐻',
    source: 'local',
    path: 'data/biblia-oso1569.json',
    url: 'https://api.getbible.net/v2/sse.json',
    description: 'Sagradas Escrituras Versión Antigua (1569), edición digital de lectura con ortografía actualizada. Viene incluida dentro de la aplicación y funciona sin conexión.'
  }
};

const DEFAULT_SETTINGS = {
  theme: 'system',
  fontSize: 19,
  lineHeight: 1.8,
  quickActions: true,
  keepAwake: false,
  bibleVersion: 'rv1909'
};

const ICONS = {
  'home': '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-5.5h5V20"/>',
  'book-open': '<path d="M3.5 5.5c3.1-1 5.9-.3 8.5 1.8V20c-2.6-2.1-5.4-2.8-8.5-1.8V5.5Z"/><path d="M20.5 5.5c-3.1-1-5.9-.3-8.5 1.8V20c2.6-2.1 5.4-2.8 8.5-1.8V5.5Z"/>',
  'search': '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  'heart': '<path d="M20.8 5.8a5.3 5.3 0 0 0-7.5 0L12 7.1l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 22l8.8-8.7a5.3 5.3 0 0 0 0-7.5Z"/>',
  'heart-filled': '<path fill="currentColor" stroke="none" d="M20.8 5.8a5.3 5.3 0 0 0-7.5 0L12 7.1l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 22l8.8-8.7a5.3 5.3 0 0 0 0-7.5Z"/>',
  'settings': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
  'moon': '<path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5 8.5 8.5 0 1 0 20.5 14.3Z"/>',
  'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  'share': '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5"/>',
  'bookmark': '<path d="M6 3.5h12v17L12 17l-6 3.5v-17Z"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'more-vertical': '<circle cx="12" cy="5" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/>',
  'x': '<path d="m6 6 12 12M18 6 6 18"/>',
  'edit': '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z"/>',
  'copy': '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  'trash': '<path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/>',
  'shield': '<path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  'wifi-off': '<path d="M2 8.8A15.8 15.8 0 0 1 5.1 7M8.5 5.2A16 16 0 0 1 22 8.8M5 12.7a10.5 10.5 0 0 1 3.2-1.8M12 10.4a10.5 10.5 0 0 1 7 2.3M8.5 16.4a5 5 0 0 1 7 0M12 20h.01M3 3l18 18"/>',
  'lock': '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  'check': '<path d="m5 12 4 4L19 6"/>'
};

const DAILY_REFERENCES = [
  ['ps', 23, 1], ['jo', 3, 16], ['ph', 4, 13], ['is', 41, 10],
  ['jr', 29, 11], ['prv', 3, 5], ['rm', 8, 28], ['ps', 46, 1],
  ['mt', 6, 33], ['ps', 27, 1], ['hb', 11, 1], ['ps', 119, 105],
  ['1co', 13, 4], ['is', 40, 31], ['js', 1, 9], ['ps', 34, 8],
  ['jo', 14, 6], ['rm', 12, 12], ['ps', 37, 5], ['mt', 11, 28],
  ['gl', 5, 22], ['ps', 91, 1], ['eph', 2, 8], ['1pe', 5, 7],
  ['cl', 3, 15], ['ps', 121, 1], ['rm', 5, 8], ['2co', 5, 17],
  ['ph', 4, 6], ['ps', 118, 24], ['jo', 8, 12]
];

const state = {
  bible: null,
  bibleCache: {},
  books: [],
  currentVersion: 'rv1909',
  bookIndex: 0,
  chapter: 1,
  screen: 'home',
  selectedVerse: null,
  dailyVerse: null,
  settings: loadObject(STORAGE.settings, DEFAULT_SETTINGS),
  favorites: loadObject(STORAGE.favorites, {}),
  notes: loadObject(STORAGE.notes, {}),
  lastReads: normalizeLastReads(loadObject(STORAGE.lastRead, { rv1909: { bookId: 'gn', chapter: 1 }, oso1569: { bookId: 'gn', chapter: 1 } })),
  savedTab: 'favorites',
  searchTimer: null,
  searchIndex: null,
  wakeLock: null,
  toastTimer: null,
  versionSwitching: false
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function loadObject(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || 'null');
    return parsed && typeof parsed === 'object' ? { ...fallback, ...parsed } : cloneValue(fallback);
  } catch (_) {
    return cloneValue(fallback);
  }
}

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function saveObject(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('No se pudo guardar localmente:', error);
    showToast('No se pudo guardar en este dispositivo');
  }
}

function iconSvg(name) {
  const paths = ICONS[name] || ICONS['book-open'];
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths}</svg>`;
}

function hydrateIcons(root = document) {
  $$('[data-icon]', root).forEach((node) => {
    node.innerHTML = iconSvg(node.dataset.icon);
  });
}

function normalizeText(text = '') {
  return String(text)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function verseKey(bookId, chapter, verse, versionId = state.currentVersion) {
  return `${versionId}:${bookId}:${chapter}:${verse}`;
}

function currentVersionConfig(versionId = state.currentVersion) {
  return BIBLE_VERSIONS[versionId] || BIBLE_VERSIONS.rv1909;
}

function normalizeLastReads(value) {
  if (value?.bookId) {
    return {
      rv1909: { ...value },
      oso1569: { bookId: 'gn', chapter: 1 }
    };
  }
  return {
    rv1909: { bookId: 'gn', chapter: 1, ...(value?.rv1909 || {}) },
    oso1569: { bookId: 'gn', chapter: 1, ...(value?.oso1569 || value?.rv1865 || {}) }
  };
}

function currentLastRead() {
  return state.lastReads[state.currentVersion] || { bookId: 'gn', chapter: 1 };
}

function saveCurrentLastRead(bookId, chapter) {
  state.lastReads[state.currentVersion] = { bookId, chapter, updatedAt: new Date().toISOString() };
  saveObject(STORAGE.lastRead, state.lastReads);
}

function migrateSavedCollections() {
  const migrate = (collection) => {
    const migrated = {};
    Object.values(collection || {}).forEach((item) => {
      if (!item?.bookId || !item?.chapter || !item?.verse) return;
      const legacyVersionId = item.versionId === 'rv1865' ? 'oso1569' : item.versionId;
      const versionId = BIBLE_VERSIONS[legacyVersionId] ? legacyVersionId : 'rv1909';
      const normalized = { ...item, versionId, versionName: currentVersionConfig(versionId).name };
      migrated[verseKey(item.bookId, item.chapter, item.verse, versionId)] = normalized;
    });
    return migrated;
  };
  state.favorites = migrate(state.favorites);
  state.notes = migrate(state.notes);
  saveObject(STORAGE.favorites, state.favorites);
  saveObject(STORAGE.notes, state.notes);
}

function getBookById(bookId) {
  return state.books.find((book) => book.id === bookId) || state.books[0];
}

function getBookIndex(bookId) {
  const index = state.books.findIndex((book) => book.id === bookId);
  return index >= 0 ? index : 0;
}

function getVerse(bookId, chapter, verse) {
  const book = getBookById(bookId);
  const text = book?.chapters?.[chapter - 1]?.[verse - 1];
  return text ? {
    bookId,
    bookName: book.name,
    chapter,
    verse,
    text,
    reference: `${book.name} ${chapter}:${verse}`,
    versionId: state.currentVersion,
    versionName: currentVersionConfig().name
  } : null;
}

function applySettings() {
  const settings = state.settings;
  const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const isDark = settings.theme === 'dark' || (settings.theme === 'system' && systemDark);
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  document.documentElement.style.setProperty('--reader-font-size', `${settings.fontSize}px`);
  document.documentElement.style.setProperty('--reader-line-height', String(settings.lineHeight));

  $('#themeSelect').value = settings.theme;
  $('#fontSizeRange').value = settings.fontSize;
  $('#readerFontRange').value = settings.fontSize;
  $('#fontSizeValue').textContent = `${settings.fontSize} px`;
  $('#readerFontValue').textContent = `${settings.fontSize} px`;
  $('#lineHeightRange').value = settings.lineHeight;
  $('#lineHeightValue').textContent = Number(settings.lineHeight).toFixed(2);
  $('#quickActionsToggle').checked = Boolean(settings.quickActions);
  $('#wakeLockToggle').checked = Boolean(settings.keepAwake);

  updateThemeQuickIcon(isDark);
  updateWakeLock();
}

function updateThemeQuickIcon(isDark) {
  const icon = $('#themeQuickBtn [data-icon]');
  const readerIcon = $('#readerThemeBtn [data-icon]');
  if (icon) {
    icon.dataset.icon = isDark ? 'sun' : 'moon';
    icon.innerHTML = iconSvg(icon.dataset.icon);
  }
  if (readerIcon) {
    readerIcon.dataset.icon = isDark ? 'sun' : 'moon';
    readerIcon.innerHTML = iconSvg(readerIcon.dataset.icon);
  }
}

function saveSettings() {
  saveObject(STORAGE.settings, state.settings);
  applySettings();
}

async function updateWakeLock() {
  if (!('wakeLock' in navigator)) return;
  if (state.settings.keepAwake && document.visibilityState === 'visible') {
    try {
      if (!state.wakeLock) {
        state.wakeLock = await navigator.wakeLock.request('screen');
        state.wakeLock.addEventListener('release', () => { state.wakeLock = null; });
      }
    } catch (error) {
      console.warn('Wake lock no disponible:', error);
    }
  } else if (state.wakeLock) {
    try { await state.wakeLock.release(); } catch (_) {}
    state.wakeLock = null;
  }
}

function populateBookSelect() {
  const select = $('#bookSelect');
  select.innerHTML = '';

  ['Antiguo Testamento', 'Nuevo Testamento'].forEach((testament) => {
    const group = document.createElement('optgroup');
    group.label = testament;
    state.books.filter((book) => book.testament === testament).forEach((book) => {
      const option = document.createElement('option');
      option.value = book.id;
      option.textContent = book.name;
      group.appendChild(option);
    });
    select.appendChild(group);
  });
}

function populateChapterSelect() {
  const book = state.books[state.bookIndex];
  const select = $('#chapterSelect');
  select.innerHTML = '';
  book.chapters.forEach((_, index) => {
    const option = document.createElement('option');
    option.value = String(index + 1);
    option.textContent = String(index + 1);
    select.appendChild(option);
  });
  select.value = String(state.chapter);
}

function setReaderLocation(bookId, chapter, options = {}) {
  const bookIndex = getBookIndex(bookId);
  const book = state.books[bookIndex];
  const safeChapter = Math.min(Math.max(Number(chapter) || 1, 1), book.chapters.length);
  state.bookIndex = bookIndex;
  state.chapter = safeChapter;
  saveCurrentLastRead(book.id, safeChapter);

  $('#bookSelect').value = book.id;
  populateChapterSelect();
  renderChapter();
  renderRecent();

  if (options.navigate !== false) navigateTo('reader');
  if (options.scroll !== false) {
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: options.smooth ? 'smooth' : 'auto' }));
  }
}

function renderChapter() {
  const book = state.books[state.bookIndex];
  const chapterVerses = book.chapters[state.chapter - 1] || [];
  const container = $('#versesContainer');
  const fragment = document.createDocumentFragment();

  $('#readerTitle').textContent = `${book.name} ${state.chapter}`;
  $('#readerTestament').textContent = book.testament;
  $('#bookSelect').value = book.id;
  $('#chapterSelect').value = String(state.chapter);

  chapterVerses.forEach((text, index) => {
    const verseNumber = index + 1;
    const key = verseKey(book.id, state.chapter, verseNumber, state.currentVersion);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `verse-row${state.favorites[key] ? ' is-favorite' : ''}`;
    button.dataset.bookId = book.id;
    button.dataset.chapter = String(state.chapter);
    button.dataset.verse = String(verseNumber);
    button.setAttribute('aria-label', `${book.name} ${state.chapter}:${verseNumber}. ${text}`);

    const number = document.createElement('span');
    number.className = 'verse-number';
    number.textContent = String(verseNumber);
    const copy = document.createElement('span');
    copy.className = 'verse-copy';
    copy.textContent = text;
    button.append(number, copy);
    fragment.appendChild(button);
  });

  container.replaceChildren(fragment);
  $('#prevChapterBtn').disabled = state.bookIndex === 0 && state.chapter === 1;
  $('#nextChapterBtn').disabled = state.bookIndex === state.books.length - 1 && state.chapter === book.chapters.length;
}

function changeChapter(direction) {
  const book = state.books[state.bookIndex];
  let nextBookIndex = state.bookIndex;
  let nextChapter = state.chapter + direction;

  if (nextChapter < 1 && nextBookIndex > 0) {
    nextBookIndex -= 1;
    nextChapter = state.books[nextBookIndex].chapters.length;
  } else if (nextChapter > book.chapters.length && nextBookIndex < state.books.length - 1) {
    nextBookIndex += 1;
    nextChapter = 1;
  }

  const nextBook = state.books[nextBookIndex];
  setReaderLocation(nextBook.id, nextChapter, { navigate: false, smooth: true });
}

function renderDailyVerse() {
  const now = new Date();
  const dayNumber = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 86400000);
  const ref = DAILY_REFERENCES[Math.abs(dayNumber) % DAILY_REFERENCES.length];
  const verse = getVerse(ref[0], ref[1], ref[2]) || getVerse('ps', 23, 1);
  state.dailyVerse = verse;
  $('#dailyVerseText').textContent = `“${verse.text}”`;
  $('#dailyVerseRef').textContent = verse.reference;
}

function renderRecent() {
  const lastRead = currentLastRead();
  const book = getBookById(lastRead.bookId || 'gn');
  const chapter = Math.min(Math.max(Number(lastRead.chapter) || 1, 1), book.chapters.length);
  $('#recentReference').textContent = `${book.name} ${chapter} · ${currentVersionConfig().shortName}`;
  const firstVerse = book.chapters[chapter - 1]?.[0] || '';
  $('#recentProgress').textContent = firstVerse;
  $('#continueReadingBtn span:last-child').textContent = lastRead.updatedAt ? 'Continuar leyendo' : 'Comenzar a leer';
}

function navigateTo(screen) {
  if (!['home', 'reader', 'search', 'saved', 'settings'].includes(screen)) return;
  state.screen = screen;
  $$('.screen').forEach((section) => section.classList.toggle('active', section.dataset.screen === screen));
  $$('.nav-item').forEach((item) => {
    const active = item.dataset.screenTarget === screen;
    item.classList.toggle('active', active);
    if (active) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });

  if (screen === 'saved') renderSaved();
  if (screen === 'reader') renderChapter();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function openVerseSheet(verse) {
  if (!verse) return;
  state.selectedVerse = verse;
  const key = verseKey(verse.bookId, verse.chapter, verse.verse, verse.versionId || state.currentVersion);
  $('#sheetRef').textContent = verse.reference;
  $('#sheetVerseText').textContent = `“${verse.text}”`;
  $('#noteTextarea').value = state.notes[key]?.note || '';
  $('#noteEditor').classList.add('hidden');
  updateVerseSheetButtons();
  showSheet($('#verseSheet'), $('#verseSheetBackdrop'));
}

function updateVerseSheetButtons() {
  if (!state.selectedVerse) return;
  const key = verseKey(state.selectedVerse.bookId, state.selectedVerse.chapter, state.selectedVerse.verse, state.selectedVerse.versionId || state.currentVersion);
  const favorite = Boolean(state.favorites[key]);
  const hasNote = Boolean(state.notes[key]?.note);
  const favoriteBtn = $('#favoriteVerseBtn');
  const noteBtn = $('#noteVerseBtn');
  favoriteBtn.classList.toggle('active', favorite);
  noteBtn.classList.toggle('active', hasNote);
  favoriteBtn.querySelector('.icon').innerHTML = iconSvg(favorite ? 'heart-filled' : 'heart');
  favoriteBtn.querySelector('span:last-child').textContent = favorite ? 'Guardado' : 'Favorito';
}

function showSheet(sheet, backdrop) {
  backdrop.classList.remove('hidden');
  sheet.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => {
    backdrop.classList.add('visible');
    sheet.classList.add('visible');
  });
  document.body.style.overflow = 'hidden';
}

function closeSheet(sheet, backdrop) {
  backdrop.classList.remove('visible');
  sheet.classList.remove('visible');
  sheet.setAttribute('aria-hidden', 'true');
  window.setTimeout(() => backdrop.classList.add('hidden'), 260);
  document.body.style.overflow = '';
}

function toggleFavorite(verse = state.selectedVerse) {
  if (!verse) return;
  const key = verseKey(verse.bookId, verse.chapter, verse.verse, verse.versionId || state.currentVersion);
  if (state.favorites[key]) {
    delete state.favorites[key];
    showToast('Eliminado de favoritos');
  } else {
    state.favorites[key] = { ...verse, createdAt: new Date().toISOString() };
    showToast('Guardado en favoritos');
  }
  saveObject(STORAGE.favorites, state.favorites);
  updateVerseSheetButtons();
  renderChapter();
  renderSavedCounts();
}

function saveSelectedNote() {
  const verse = state.selectedVerse;
  if (!verse) return;
  const key = verseKey(verse.bookId, verse.chapter, verse.verse, verse.versionId || state.currentVersion);
  const note = $('#noteTextarea').value.trim();
  if (note) {
    state.notes[key] = { ...verse, note, updatedAt: new Date().toISOString() };
    showToast('Nota guardada');
  } else {
    delete state.notes[key];
    showToast('Nota eliminada');
  }
  saveObject(STORAGE.notes, state.notes);
  updateVerseSheetButtons();
  renderSavedCounts();
  $('#noteEditor').classList.add('hidden');
}

function deleteSelectedNote() {
  const verse = state.selectedVerse;
  if (!verse) return;
  const key = verseKey(verse.bookId, verse.chapter, verse.verse, verse.versionId || state.currentVersion);
  delete state.notes[key];
  saveObject(STORAGE.notes, state.notes);
  $('#noteTextarea').value = '';
  $('#noteEditor').classList.add('hidden');
  updateVerseSheetButtons();
  renderSavedCounts();
  showToast('Nota eliminada');
}

function formatVerseText(verse) {
  const versionName = verse.versionName || currentVersionConfig(verse.versionId).name;
  return `“${verse.text}”\n\n${verse.reference} · ${versionName}\n\nCompartido desde Biblia Vida`;
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    showToast('Texto copiado');
  } catch (error) {
    console.warn(error);
    showToast('No se pudo copiar');
  }
}

async function shareVerse(verse) {
  if (!verse) return;
  const text = formatVerseText(verse);
  try {
    if (navigator.share) {
      await navigator.share({ title: verse.reference, text });
    } else {
      await copyText(text);
    }
  } catch (error) {
    if (error?.name !== 'AbortError') {
      console.warn(error);
      await copyText(text);
    }
  }
}

function buildSearchIndex() {
  const index = [];
  state.books.forEach((book) => {
    book.chapters.forEach((chapter, chapterIndex) => {
      chapter.forEach((text, verseIndex) => {
        index.push({
          bookId: book.id,
          bookName: book.name,
          chapter: chapterIndex + 1,
          verse: verseIndex + 1,
          text,
          normalized: normalizeText(text),
          reference: `${book.name} ${chapterIndex + 1}:${verseIndex + 1}`
        });
      });
    });
  });
  state.searchIndex = index;
}

function performSearch(query) {
  const normalized = normalizeText(query);
  const status = $('#searchStatus');
  const results = $('#searchResults');
  const empty = $('#searchEmpty');

  if (normalized.length < 2) {
    results.replaceChildren();
    status.textContent = 'Escribe al menos dos letras para comenzar.';
    empty.classList.remove('hidden');
    return;
  }

  if (!state.searchIndex) buildSearchIndex();
  const terms = normalized.split(' ').filter(Boolean);
  const maxResults = 150;
  const phraseMatches = [];
  const wordMatches = [];

  for (const item of state.searchIndex) {
    const words = new Set(item.normalized.split(' '));
    const containsPhrase = terms.length > 1 && item.normalized.includes(normalized);
    const containsAllWords = terms.every((term) => {
      if (words.has(term)) return true;
      return term.length >= 4 && [...words].some((word) => word.startsWith(term));
    });

    if (containsPhrase) phraseMatches.push(item);
    else if (containsAllWords) wordMatches.push(item);

    if (phraseMatches.length >= maxResults) break;
  }

  const matches = (phraseMatches.length ? phraseMatches : wordMatches).slice(0, maxResults);

  results.replaceChildren();
  empty.classList.add('hidden');
  status.textContent = matches.length === 0
    ? 'No se encontraron versículos.'
    : `${matches.length}${matches.length === maxResults ? '+' : ''} resultado${matches.length === 1 ? '' : 's'}`;

  if (matches.length === 0) {
    const noResults = document.createElement('div');
    noResults.className = 'empty-state';
    noResults.innerHTML = `<div class="empty-icon"><span class="icon">${iconSvg('search')}</span></div><h3>Sin resultados</h3><p>Prueba con menos palabras o revisa la ortografía.</p>`;
    results.appendChild(noResults);
    return;
  }

  const fragment = document.createDocumentFragment();
  matches.forEach((item) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'result-card';
    button.dataset.bookId = item.bookId;
    button.dataset.chapter = String(item.chapter);
    button.dataset.verse = String(item.verse);

    const ref = document.createElement('div');
    ref.className = 'result-ref';
    const refText = document.createElement('span');
    refText.textContent = item.reference;
    const arrow = document.createElement('span');
    arrow.className = 'icon';
    arrow.innerHTML = iconSvg('chevron-right');
    ref.append(refText, arrow);

    const p = document.createElement('p');
    appendHighlightedText(p, item.text, query);
    button.append(ref, p);
    fragment.appendChild(button);
  });
  results.appendChild(fragment);
}

function appendHighlightedText(container, text, query) {
  const rawLower = text.toLocaleLowerCase('es');
  const rawQuery = String(query).trim().toLocaleLowerCase('es');
  const rawTerms = String(query)
    .toLocaleLowerCase('es')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((term) => term.length >= 2)
    .sort((a, b) => b.length - a.length);

  const candidates = rawQuery ? [rawQuery, ...rawTerms] : rawTerms;
  const rawTerm = candidates.find((term) => rawLower.includes(term)) || '';
  const rawIndex = rawTerm ? rawLower.indexOf(rawTerm) : -1;

  if (rawIndex < 0) {
    container.textContent = text;
    return;
  }

  container.append(document.createTextNode(text.slice(0, rawIndex)));
  const mark = document.createElement('mark');
  mark.textContent = text.slice(rawIndex, rawIndex + rawTerm.length);
  container.append(mark, document.createTextNode(text.slice(rawIndex + rawTerm.length)));
}

function setSavedTab(tab) {
  state.savedTab = tab;
  const favoritesActive = tab === 'favorites';
  $('#favoritesTab').classList.toggle('active', favoritesActive);
  $('#favoritesTab').setAttribute('aria-selected', String(favoritesActive));
  $('#notesTab').classList.toggle('active', !favoritesActive);
  $('#notesTab').setAttribute('aria-selected', String(!favoritesActive));
  $('#favoritesList').classList.toggle('hidden', !favoritesActive);
  $('#notesList').classList.toggle('hidden', favoritesActive);
}

function renderSavedCounts() {
  $('#favoriteCountBadge').textContent = String(Object.keys(state.favorites).length);
  $('#noteCountBadge').textContent = String(Object.keys(state.notes).length);
}

function renderSaved() {
  renderSavedCounts();
  renderSavedList('favorites');
  renderSavedList('notes');
  setSavedTab(state.savedTab);
}

function renderSavedList(type) {
  const source = type === 'favorites' ? state.favorites : state.notes;
  const list = type === 'favorites' ? $('#favoritesList') : $('#notesList');
  const items = Object.values(source).sort((a, b) => {
    const aDate = a.updatedAt || a.createdAt || '';
    const bDate = b.updatedAt || b.createdAt || '';
    return bDate.localeCompare(aDate);
  });

  list.replaceChildren();
  if (!items.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = type === 'favorites'
      ? `<div class="empty-icon"><span class="icon">${iconSvg('heart')}</span></div><h3>Aún no tienes favoritos</h3><p>Toca un versículo y presiona “Favorito” para guardarlo aquí.</p>`
      : `<div class="empty-icon"><span class="icon">${iconSvg('edit')}</span></div><h3>Aún no tienes notas</h3><p>Toca un versículo y escribe lo que Dios habló a tu corazón.</p>`;
    list.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'saved-card';
    const ref = document.createElement('div');
    ref.className = 'saved-ref';
    ref.textContent = item.reference;
    const version = document.createElement('span');
    version.className = 'saved-version-badge';
    version.textContent = `${currentVersionConfig(item.versionId).icon} ${currentVersionConfig(item.versionId).shortName}`;
    const text = document.createElement('blockquote');
    text.textContent = `“${item.text}”`;
    const menu = document.createElement('button');
    menu.type = 'button';
    menu.className = 'icon-btn saved-card-menu';
    menu.innerHTML = `<span class="icon">${iconSvg('more-vertical')}</span>`;
    menu.setAttribute('aria-label', `Opciones para ${item.reference}`);
    menu.addEventListener('click', () => openVerseSheet(item));
    card.append(ref, version, text, menu);

    if (type === 'notes' && item.note) {
      const note = document.createElement('p');
      note.className = 'saved-note';
      note.textContent = item.note;
      card.appendChild(note);
    }

    const date = item.updatedAt || item.createdAt;
    if (date) {
      const time = document.createElement('time');
      time.className = 'saved-date';
      time.dateTime = date;
      time.textContent = new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(new Date(date));
      card.appendChild(time);
    }

    card.addEventListener('click', async (event) => {
      if (event.target.closest('.saved-card-menu')) return;
      if ((item.versionId || 'rv1909') !== state.currentVersion) {
        const changed = await switchBible(item.versionId || 'rv1909', { preserveLocation: false });
        if (!changed) return;
      }
      setReaderLocation(item.bookId, item.chapter, { smooth: false });
      window.setTimeout(() => {
        const verseButton = $(`.verse-row[data-verse="${item.verse}"]`);
        verseButton?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 120);
    });
    fragment.appendChild(card);
  });
  list.appendChild(fragment);
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2200);
}

function toggleTheme() {
  const currentDark = document.documentElement.dataset.theme === 'dark';
  state.settings.theme = currentDark ? 'light' : 'dark';
  saveSettings();
  showToast(currentDark ? 'Tema claro activado' : 'Tema oscuro activado');
}

function resetAllData() {
  const confirmed = window.confirm('¿Deseas borrar todos tus favoritos, notas y progreso de lectura? Esta acción no se puede deshacer.');
  if (!confirmed) return;
  state.favorites = {};
  state.notes = {};
  state.lastReads = {
    rv1909: { bookId: 'gn', chapter: 1 },
    oso1569: { bookId: 'gn', chapter: 1 }
  };
  saveObject(STORAGE.favorites, state.favorites);
  saveObject(STORAGE.notes, state.notes);
  saveObject(STORAGE.lastRead, state.lastReads);
  renderSaved();
  renderRecent();
  renderChapter();
  showToast('Datos personales eliminados');
}

function bindEvents() {
  $$('.nav-item').forEach((button) => button.addEventListener('click', () => navigateTo(button.dataset.screenTarget)));
  $$('[data-go]').forEach((button) => button.addEventListener('click', () => navigateTo(button.dataset.go)));

  $('#continueReadingBtn').addEventListener('click', () => { const lastRead = currentLastRead(); setReaderLocation(lastRead.bookId || 'gn', lastRead.chapter || 1); });
  $('#recentCard').addEventListener('click', () => { const lastRead = currentLastRead(); setReaderLocation(lastRead.bookId || 'gn', lastRead.chapter || 1); });
  $('#shareDailyBtn').addEventListener('click', () => shareVerse(state.dailyVerse));
  $('#themeQuickBtn').addEventListener('click', toggleTheme);

  const handleVersionChange = async (event) => {
    const requested = event.target.value;
    const changed = await switchBible(requested, { preserveLocation: true });
    if (!changed) syncVersionSelects();
  };
  $('#readerVersionSelect').addEventListener('change', handleVersionChange);
  $('#versionSelect').addEventListener('change', handleVersionChange);

  $('#bookSelect').addEventListener('change', (event) => setReaderLocation(event.target.value, 1, { navigate: false }));
  $('#chapterSelect').addEventListener('change', (event) => setReaderLocation(state.books[state.bookIndex].id, Number(event.target.value), { navigate: false }));
  $('#prevChapterBtn').addEventListener('click', () => changeChapter(-1));
  $('#nextChapterBtn').addEventListener('click', () => changeChapter(1));
  $('#versesContainer').addEventListener('click', (event) => {
    const row = event.target.closest('.verse-row');
    if (!row) return;
    const verse = getVerse(row.dataset.bookId, Number(row.dataset.chapter), Number(row.dataset.verse));
    if (state.settings.quickActions) openVerseSheet(verse);
    else toggleFavorite(verse);
  });

  $('#searchInput').addEventListener('input', (event) => {
    const value = event.target.value;
    $('#clearSearchBtn').classList.toggle('hidden', !value);
    window.clearTimeout(state.searchTimer);
    state.searchTimer = window.setTimeout(() => performSearch(value), 230);
  });
  $('#clearSearchBtn').addEventListener('click', () => {
    $('#searchInput').value = '';
    $('#clearSearchBtn').classList.add('hidden');
    performSearch('');
    $('#searchInput').focus();
  });
  $('#searchResults').addEventListener('click', (event) => {
    const card = event.target.closest('.result-card');
    if (!card) return;
    setReaderLocation(card.dataset.bookId, Number(card.dataset.chapter));
    window.setTimeout(() => {
      const row = $(`.verse-row[data-verse="${card.dataset.verse}"]`);
      row?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);
  });

  $$('[data-saved-tab]').forEach((button) => button.addEventListener('click', () => setSavedTab(button.dataset.savedTab)));

  $('#closeVerseSheetBtn').addEventListener('click', () => closeSheet($('#verseSheet'), $('#verseSheetBackdrop')));
  $('#verseSheetBackdrop').addEventListener('click', () => closeSheet($('#verseSheet'), $('#verseSheetBackdrop')));
  $('#favoriteVerseBtn').addEventListener('click', () => toggleFavorite());
  $('#copyVerseBtn').addEventListener('click', () => state.selectedVerse && copyText(formatVerseText(state.selectedVerse)));
  $('#shareVerseBtn').addEventListener('click', () => shareVerse(state.selectedVerse));
  $('#noteVerseBtn').addEventListener('click', () => {
    $('#noteEditor').classList.toggle('hidden');
    if (!$('#noteEditor').classList.contains('hidden')) {
      window.setTimeout(() => $('#noteTextarea').focus(), 80);
    }
  });
  $('#saveNoteBtn').addEventListener('click', saveSelectedNote);
  $('#deleteNoteBtn').addEventListener('click', deleteSelectedNote);

  $('#readerMoreBtn').addEventListener('click', () => showSheet($('#readerOptionsSheet'), $('#readerOptionsBackdrop')));
  $('#closeReaderOptionsBtn').addEventListener('click', () => closeSheet($('#readerOptionsSheet'), $('#readerOptionsBackdrop')));
  $('#readerOptionsBackdrop').addEventListener('click', () => closeSheet($('#readerOptionsSheet'), $('#readerOptionsBackdrop')));
  $('#readerThemeBtn').addEventListener('click', toggleTheme);

  $('#themeSelect').addEventListener('change', (event) => {
    state.settings.theme = event.target.value;
    saveSettings();
  });
  const syncFontSize = (value) => {
    state.settings.fontSize = Number(value);
    saveSettings();
  };
  $('#fontSizeRange').addEventListener('input', (event) => syncFontSize(event.target.value));
  $('#readerFontRange').addEventListener('input', (event) => syncFontSize(event.target.value));
  $('#lineHeightRange').addEventListener('input', (event) => {
    state.settings.lineHeight = Number(event.target.value);
    saveSettings();
  });
  $('#quickActionsToggle').addEventListener('change', (event) => {
    state.settings.quickActions = event.target.checked;
    saveSettings();
  });
  $('#wakeLockToggle').addEventListener('change', (event) => {
    state.settings.keepAwake = event.target.checked;
    saveSettings();
  });
  $('#resetDataBtn').addEventListener('click', resetAllData);

  $('#welcomeStartBtn').addEventListener('click', async () => {
    localStorage.setItem(STORAGE.welcomed, '1');
    $('#welcomeModal').classList.add('hidden');
    const requested = $('#welcomeVersionSelect').value;
    if (requested !== state.currentVersion) await switchBible(requested, { preserveLocation: false });
  });

  document.addEventListener('visibilitychange', updateWakeLock);
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change', () => {
    if (state.settings.theme === 'system') applySettings();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if ($('#verseSheet').classList.contains('visible')) closeSheet($('#verseSheet'), $('#verseSheetBackdrop'));
    if ($('#readerOptionsSheet').classList.contains('visible')) closeSheet($('#readerOptionsSheet'), $('#readerOptionsBackdrop'));
  });
}

function openBibleDb() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('Este dispositivo no permite guardar la versión descargada.'));
      return;
    }
    const request = indexedDB.open(BIBLE_DB.name, BIBLE_DB.version);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(BIBLE_DB.store)) db.createObjectStore(BIBLE_DB.store);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('No se pudo abrir el almacenamiento local.'));
  });
}

async function bibleDbGet(key) {
  const db = await openBibleDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(BIBLE_DB.store, 'readonly');
    const request = tx.objectStore(BIBLE_DB.store).get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
  });
}

async function bibleDbPut(key, value) {
  const db = await openBibleDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(BIBLE_DB.store, 'readwrite');
    tx.objectStore(BIBLE_DB.store).put(value, key);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

function setDownloadProgress(percent, message) {
  const safe = Math.min(100, Math.max(0, Number(percent) || 0));
  $('#downloadProgressBar').style.width = `${safe}%`;
  $('.download-progress').setAttribute('aria-valuenow', String(Math.round(safe)));
  $('#downloadProgressText').textContent = `${Math.round(safe)}%`;
  if (message) $('#downloadMessage').textContent = message;
}

function showDownloadModal() {
  const modal = $('#versionDownloadModal');
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  setDownloadProgress(8, 'La descarga se realiza una sola vez. Después podrás leer esta versión sin conexión.');
}

function hideDownloadModal() {
  const modal = $('#versionDownloadModal');
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

async function fetchJson(url, timeoutMs = 90000) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { cache: 'no-store', signal: controller.signal });
    if (!response.ok) throw new Error(`El servidor respondió ${response.status}`);
    return await response.json();
  } finally {
    window.clearTimeout(timer);
  }
}

function collectChapterNodes(value, output, seen = new WeakSet(), context = {}) {
  if (!value || typeof value !== 'object') return;
  if (seen.has(value)) return;
  seen.add(value);

  const bookNr = Number(value.book_nr || value.book_number || context.bookNr || 0);
  const bookName = value.book_name || value.book || context.bookName || '';
  const verses = value.verses;

  if (value.chapter && verses && typeof verses === 'object' && bookNr) {
    output.push({ ...value, book_nr: bookNr, book_name: value.book_name || bookName });
    return;
  }

  const nextContext = { bookNr, bookName };
  if (Array.isArray(value)) {
    value.forEach((item) => collectChapterNodes(item, output, seen, nextContext));
  } else {
    Object.entries(value).forEach(([key, item]) => {
      let childContext = nextContext;
      if (!bookNr && /^\d+$/.test(key) && item && typeof item === 'object' && (item.chapters || item.book_nr || item.book_name)) {
        childContext = { bookNr: Number(key), bookName: item.book_name || item.name || '' };
      }
      collectChapterNodes(item, output, seen, childContext);
    });
  }
}

function orderedValues(value, numberKey) {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== 'object') return [];
  return Object.values(value).sort((a, b) => Number(a?.[numberKey] || 0) - Number(b?.[numberKey] || 0));
}

function normalizeGetBibleTranslation(payload) {
  const nodes = [];
  collectChapterNodes(payload, nodes);
  if (nodes.length < 1100) throw new Error('La descarga bíblica llegó incompleta.');

  const baseBooks = state.bibleCache.rv1909?.books || [];
  const grouped = new Map();
  nodes.forEach((node) => {
    const bookNumber = Number(node.book_nr);
    const chapterNumber = Number(node.chapter);
    if (!bookNumber || !chapterNumber) return;
    if (!grouped.has(bookNumber)) grouped.set(bookNumber, new Map());
    const verseItems = orderedValues(node.verses, 'verse');
    const texts = verseItems.map((item) => String(item?.text || '').trim());
    if (texts.length) grouped.get(bookNumber).set(chapterNumber, { name: node.book_name, texts });
  });

  const books = baseBooks.map((baseBook, index) => {
    const chapterMap = grouped.get(index + 1);
    if (!chapterMap) throw new Error(`Falta el libro ${baseBook.name} en la descarga.`);
    const chapterNumbers = [...chapterMap.keys()].sort((a, b) => a - b);
    return {
      id: baseBook.id,
      name: chapterMap.get(chapterNumbers[0])?.name || baseBook.name,
      testament: baseBook.testament,
      chapters: chapterNumbers.map((chapterNumber) => chapterMap.get(chapterNumber).texts)
    };
  });

  if (books.length !== 66) throw new Error('La versión descargada no contiene los 66 libros esperados.');
  return {
    metadata: {
      name: 'Biblia del Oso 1569',
      abbreviation: 'Oso 1569',
      source: 'GetBible API v2',
      sourceCatalogName: 'Sagradas Escrituras (1569)',
      sourceDescription: 'Sagradas Escrituras Versión Antigua (1569), edición digital con ortografía actualizada',
      editorialNotice: 'La ficha técnica del módulo sse describe su base digital como Reina-Valera 1865 con arreglos ortográficos; no es un facsímil ni una transcripción letra por letra de la impresión de 1569.',
      sourceLicense: 'Public Domain',
      sourceUrl: 'https://api.getbible.net/v2/sse.json',
      downloadedAt: new Date().toISOString(),
      books: 66
    },
    books
  };
}

async function downloadOso1569Bible() {
  showDownloadModal();
  try {
    setDownloadProgress(18, 'Conectando con la fuente bíblica verificada…');
    const payload = await fetchJson(BIBLE_VERSIONS.oso1569.url);
    setDownloadProgress(72, 'Organizando los 66 libros para la lectura sin conexión…');
    await new Promise((resolve) => window.setTimeout(resolve, 60));
    const bible = normalizeGetBibleTranslation(payload);
    setDownloadProgress(88, 'Guardando la Biblia dentro de este dispositivo…');
    await bibleDbPut(OSO1569_CACHE_KEY, bible);
    setDownloadProgress(100, '¡Lista! La Biblia del Oso 1569 ya está disponible sin conexión.');
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    return bible;
  } finally {
    hideDownloadModal();
  }
}

async function isOso1569Installed() {
  if (state.bibleCache.oso1569) return true;
  try { return Boolean(await bibleDbGet(OSO1569_CACHE_KEY)); } catch (_) { return false; }
}

async function loadBibleVersion(versionId, options = {}) {
  if (state.bibleCache[versionId]) return state.bibleCache[versionId];
  const config = currentVersionConfig(versionId);

  if (config.source === 'local') {
    try {
      const response = await fetch(config.path, { cache: 'force-cache' });
      if (!response.ok) throw new Error(`No se pudo cargar la Biblia (${response.status})`);
      const bible = await response.json();
      if (!Array.isArray(bible.books) || bible.books.length !== 66) throw new Error('El archivo bíblico no es válido');
      state.bibleCache[versionId] = bible;
      return bible;
    } catch (localError) {
      if (versionId !== 'oso1569') throw localError;

      console.warn('No se encontró la Biblia del Oso incluida. Se intentará recuperar la copia guardada o descargarla:', localError);

      try {
        let cached = await bibleDbGet(OSO1569_CACHE_KEY);
        if (!cached) {
          const legacyCached = await bibleDbGet(LEGACY_OSO1569_CACHE_KEY);
          if (legacyCached?.books?.length === 66) {
            cached = {
              ...legacyCached,
              metadata: {
                ...(legacyCached.metadata || {}),
                name: 'Biblia del Oso 1569',
                abbreviation: 'Oso 1569',
                sourceCatalogName: 'Sagradas Escrituras (1569)',
                editorialNotice: 'Edición digital con ortografía actualizada; no es un facsímil ni una transcripción letra por letra de la impresión de 1569.'
              }
            };
            await bibleDbPut(OSO1569_CACHE_KEY, cached);
          }
        }
        if (cached?.books?.length === 66) {
          state.bibleCache[versionId] = cached;
          return cached;
        }
      } catch (cacheError) {
        console.warn('No se pudo recuperar la copia guardada de la Biblia del Oso:', cacheError);
      }

      if (options.allowDownload === false) return null;
      const bible = await downloadOso1569Bible();
      state.bibleCache[versionId] = bible;
      return bible;
    }
  }

  if (config.source === 'bundled') {
    const response = await fetch(config.path, { cache: 'force-cache' });
    if (!response.ok) throw new Error(`No se pudo abrir la Biblia del Oso (${response.status})`);
    const payload = await response.json();
    const bible = normalizeGetBibleTranslation(payload);
    state.bibleCache[versionId] = bible;
    return bible;
  }

  try {
    let cached = await bibleDbGet(OSO1569_CACHE_KEY);
    if (!cached) {
      const legacyCached = await bibleDbGet(LEGACY_OSO1569_CACHE_KEY);
      if (legacyCached?.books?.length === 66) {
        cached = {
          ...legacyCached,
          metadata: {
            ...(legacyCached.metadata || {}),
            name: 'Biblia del Oso 1569',
            abbreviation: 'Oso 1569',
            sourceCatalogName: 'Sagradas Escrituras (1569)',
            editorialNotice: 'Edición digital con ortografía actualizada; no es un facsímil ni una transcripción letra por letra de la impresión de 1569.'
          }
        };
        await bibleDbPut(OSO1569_CACHE_KEY, cached);
      }
    }
    if (cached?.books?.length === 66) {
      state.bibleCache[versionId] = cached;
      return cached;
    }
  } catch (error) {
    console.warn('No se pudo leer la Biblia descargada:', error);
  }

  if (options.allowDownload === false) return null;
  const bible = await downloadOso1569Bible();
  state.bibleCache[versionId] = bible;
  return bible;
}

function syncVersionSelects() {
  ['#readerVersionSelect', '#versionSelect', '#welcomeVersionSelect'].forEach((selector) => {
    const select = $(selector);
    if (select) select.value = state.currentVersion;
  });
}

async function updateVersionUi() {
  const config = currentVersionConfig();
  $('#brandVersion').textContent = config.name;
  $('#readerVersionBadge').textContent = `${config.icon} ${config.name}`;
  $('#searchVersionLabel').textContent = config.name;
  $('#homeVersionSummary').textContent = config.name;
  $('#versionInfoTitle').textContent = `${config.icon} ${config.name}`;
  $('#versionInfoDescription').textContent = config.description;
  $('#versionStatusText').textContent = 'Esta versión viene instalada dentro de la aplicación y está disponible sin conexión.';
  syncVersionSelects();
}

async function switchBible(versionId, options = {}) {
  if (!BIBLE_VERSIONS[versionId] || state.versionSwitching) return false;
  if (versionId === state.currentVersion && state.books.length) {
    syncVersionSelects();
    return true;
  }

  const previousVersion = state.currentVersion;
  const previousBible = state.bible;
  const previousBooks = state.books;
  const previousBookIndex = state.bookIndex;
  const previousBookId = state.books[state.bookIndex]?.id || currentLastRead().bookId || 'gn';
  const previousChapter = state.chapter || 1;
  state.versionSwitching = true;
  try {
    const bible = await loadBibleVersion(versionId);
    if (!bible) return false;
    state.currentVersion = versionId;
    state.settings.bibleVersion = versionId;
    state.bible = bible;
    state.books = bible.books;
    state.searchIndex = null;
    saveObject(STORAGE.settings, state.settings);

    const target = options.preserveLocation === false
      ? (state.lastReads[versionId] || { bookId: 'gn', chapter: 1 })
      : { bookId: previousBookId, chapter: previousChapter };
    const book = getBookById(target.bookId || 'gn');
    state.bookIndex = getBookIndex(book.id);
    state.chapter = Math.min(Math.max(Number(target.chapter) || 1, 1), book.chapters.length);
    saveCurrentLastRead(book.id, state.chapter);

    populateBookSelect();
    $('#bookSelect').value = book.id;
    populateChapterSelect();
    renderChapter();
    renderDailyVerse();
    renderRecent();
    renderSavedCounts();
    performSearch($('#searchInput').value || '');
    await updateVersionUi();
    showToast(`${currentVersionConfig().name} activada`);
    return true;
  } catch (error) {
    console.error(error);
    state.currentVersion = previousVersion;
    state.bible = previousBible;
    state.books = previousBooks;
    state.bookIndex = previousBookIndex;
    state.chapter = previousChapter;
    syncVersionSelects();
    window.alert('No se pudo abrir la Biblia del Oso 1569 incluida en la aplicación. Cierra y vuelve a abrir la app.');
    return false;
  } finally {
    state.versionSwitching = false;
  }
}

function showLoadError(error) {
  console.error(error);
  const loading = $('#loadingScreen');
  loading.innerHTML = `
    <div class="loading-logo"><svg viewBox="0 0 48 48"><path d="M7 10.5c6.4-2.2 11.9-.9 17 3.4v25c-5.1-4.3-10.6-5.6-17-3.4v-25Z"/><path d="M41 10.5c-6.4-2.2-11.9-.9-17 3.4v25c5.1-4.3 10.6-5.6 17-3.4v-25Z"/></svg></div>
    <h2>No pudimos abrir la Biblia</h2>
    <p style="max-width:320px;text-align:center;line-height:1.5">Cierra y vuelve a abrir la aplicación. Tus datos personales permanecen seguros.</p>
    <button class="btn btn-gold" style="margin-top:20px" onclick="location.reload()">Intentar de nuevo</button>`;
}

async function init() {
  hydrateIcons();
  migrateSavedCollections();
  bindEvents();
  applySettings();

  try {
    const rvBible = await loadBibleVersion('rv1909');
    state.bibleCache.rv1909 = rvBible;
    if (state.settings.bibleVersion === 'rv1865') state.settings.bibleVersion = 'oso1569';
    const requestedVersion = BIBLE_VERSIONS[state.settings.bibleVersion] ? state.settings.bibleVersion : 'rv1909';
    let initialBible = rvBible;
    if (requestedVersion === 'oso1569') {
      initialBible = await loadBibleVersion('oso1569') || rvBible;
      state.currentVersion = initialBible === rvBible ? 'rv1909' : 'oso1569';
      if (state.currentVersion !== requestedVersion) state.settings.bibleVersion = 'rv1909';
    } else {
      state.currentVersion = 'rv1909';
    }

    state.bible = initialBible;
    state.books = initialBible.books;
    const lastRead = currentLastRead();
    populateBookSelect();
    const initialBook = getBookById(lastRead.bookId || 'gn');
    state.bookIndex = getBookIndex(initialBook.id);
    state.chapter = Math.min(Math.max(Number(lastRead.chapter) || 1, 1), initialBook.chapters.length);
    $('#bookSelect').value = initialBook.id;
    populateChapterSelect();
    renderChapter();
    renderDailyVerse();
    renderRecent();
    renderSavedCounts();
    await updateVersionUi();
    $('#app').setAttribute('aria-busy', 'false');

    window.setTimeout(() => $('#loadingScreen').classList.add('is-hidden'), 450);
    if (!localStorage.getItem(STORAGE.welcomed)) {
      $('#welcomeVersionSelect').value = state.currentVersion;
      window.setTimeout(() => $('#welcomeModal').classList.remove('hidden'), 800);
    }

    if ('requestIdleCallback' in window) window.requestIdleCallback(buildSearchIndex, { timeout: 3500 });
    else window.setTimeout(buildSearchIndex, 1000);
  } catch (error) {
    showLoadError(error);
  }
}

document.addEventListener('DOMContentLoaded', init);
