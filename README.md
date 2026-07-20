# 📖 Biblia Vida v1.2.4

Aplicación Android de lectura bíblica **sin publicidad**, con **Reina-Valera 1909** y **Biblia del Oso 1569 — Sagradas Escrituras Versión Antigua** incluidas dentro del APK para funcionar sin conexión.

Proyecto desarrollado para **Proca Corporación**.

## Corrección principal de la versión 1.2.4

- Corrige el aviso que impedía abrir la Biblia del Oso.
- La compilación descarga, convierte y valida los 66 libros antes de crear la APK.
- Si falla la descarga completa, GitHub Actions obtiene los 66 libros por separado.
- La compilación se detiene si el texto no contiene 66 libros, 1,189 capítulos y más de 30,000 versículos.
- La Biblia del Oso queda incluida físicamente en `assets/public/data/biblia-oso1569.json` dentro de la APK.
- El caché cambia a `biblia-vida-v1.2.4` y ya no almacena respuestas HTTP fallidas.
- Dentro de la aplicación Android se desactiva el service worker, porque los recursos ya vienen en la APK y no deben conservar una pantalla o un error de una versión anterior.
- Android: `versionName 1.2.4` y `versionCode 7`.

> **Instalación de prueba:** desinstala primero la versión 1.2.3 y luego instala la 1.2.4. Esto elimina el caché 404 que pudo quedar guardado por la versión anterior.

## Funciones incluidas

- Dos versiones bíblicas históricas seleccionables.
- Lectura por libro y capítulo.
- Navegación al capítulo anterior y siguiente.
- Buscador local por palabras o frases.
- Versículo del día.
- Favoritos y notas personales por versión.
- Copiar y compartir versículos.
- Modo claro, oscuro o igual al sistema.
- Tamaño de letra y espaciado configurables.
- Última lectura independiente para cada versión.
- Diseño adaptable para teléfonos Android.
- Sin anuncios, analítica ni rastreadores.

## Tecnología

- HTML, CSS y JavaScript.
- Capacitor 8.
- Proyecto Android nativo incluido.
- Textos bíblicos almacenados localmente en JSON dentro del APK final.
- Preferencias, favoritos y notas almacenados localmente en el dispositivo.

## Carpetas principales

```text
BibliaVida-Android-v1.2.4-Cache-Limpio/
├── .github/workflows/     # Descarga, validación y compilación automática
├── www/                   # Aplicación web y RVR 1909
├── android/               # Proyecto nativo Android
├── resources/             # Icono y pantalla de inicio
├── scripts/               # Conversión y validación de la Biblia del Oso
├── capacitor.config.json
├── package.json
└── GUIA_SIN_ANDROID_STUDIO.md
```

## Generar la APK

La forma recomendada es GitHub Actions. Consulta **GUIA_SIN_ANDROID_STUDIO.md**.

La Biblia del Oso no está guardada en este ZIP fuente: el flujo automático la obtiene desde la fuente pública, la valida y la copia dentro de la APK antes de compilar. Si la descarga o la validación falla, GitHub mostrará el proceso en rojo y no entregará una APK incompleta.

## Datos Android

- Nombre: Biblia Vida
- ID: `com.proca.bibliavida`
- Versión: `1.2.4`
- Código de versión: `7`
- APK generada: `Biblia-Vida-v1.2.4.apk`

## Texto bíblico y privacidad

Consulta **AVISO_TEXTO_BIBLICO.md** y **PRIVACIDAD.md**. En la APK final ambas Biblias quedan disponibles sin conexión. El permiso de Internet permanece como mecanismo de recuperación únicamente si faltara el archivo local, pero el uso normal no requiere descargar la Biblia del Oso desde el teléfono.
