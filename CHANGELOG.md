# Historial de cambios

## 1.2.3 — 14 de julio de 2026

- Corrige el caso en que `biblia-oso1569.json` no quedó dentro del APK.
- Primero intenta abrir la Biblia del Oso incluida localmente.
- Si el archivo faltara, recupera una copia guardada o la descarga una sola vez desde GetBible y la conserva para lectura sin conexión.
- Agrega el permiso de Internet únicamente para esa recuperación de emergencia.
- Android `versionCode 6` y `versionName 1.2.3`.

## 1.2.2 — 14 de julio de 2026

- Corrige definitivamente la apertura de la Biblia del Oso 1569.
- El texto ya no se interpreta dentro del teléfono: se convierte al formato interno durante la compilación.
- Valida 66 libros, 1,189 capítulos y más de 30,000 versículos antes de compilar.
- Valida que Génesis 1:1 corresponda a la edición de lectura con ortografía actualizada.
- Verifica que `biblia-oso1569.json` quede físicamente dentro de los recursos Android y dentro del APK final.
- Android `versionCode 5` y `versionName 1.2.2`.

## 1.2.1 — 13 de julio de 2026

- Intento inicial de incluir el archivo original de la API dentro del APK.
