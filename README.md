# 📖 Biblia Vida v1.2.1

Aplicación Android con **Reina-Valera 1909** incluida y **Biblia del Oso 1569 — Sagradas Escrituras Versión Antigua** disponible mediante una descarga opcional de una sola vez. La edición digital usa **ortografía actualizada**; después de descargarla puede leerse **sin conexión**, **sin publicidad**, **sin cuentas** y sin enviar favoritos o notas a servidores.

Proyecto desarrollado para **Proca Corporación**.

## Novedad principal de la versión 1.2.1

- La segunda versión ahora se presenta al usuario como **Biblia del Oso 1569**.
- Selector de versión en la bienvenida, el lector y los ajustes.
- Cambio de versión conservando el mismo libro y capítulo cuando existe.
- Reina-Valera 1909 incluida dentro de la instalación.
- Biblia del Oso 1569 descargable una sola vez desde GetBible y guardada en el dispositivo mediante IndexedDB.
- Favoritos, notas, búsqueda, versículo del día, compartir y última lectura identifican la versión bíblica activa.
- Migración automática desde el identificador provisional `rv1865` usado en la versión 1.1.0.
- La descarga opcional usa HTTPS y no requiere crear una cuenta.

> **Aclaración editorial:** la edición digital se cataloga como “Sagradas Escrituras (1569)” y se usa ampliamente con el nombre “Biblia del Oso 1569”. No es un facsímil ni una transcripción letra por letra de la impresión original. La ficha técnica del módulo `sse` describe su base digital como una Reina-Valera 1865 con arreglos ortográficos. La aplicación comunica esta diferencia en la sección **Ajustes → Texto bíblico**.

## Funciones incluidas

- Dos versiones bíblicas históricas seleccionables.
- Lectura por libro y capítulo.
- Navegación al capítulo anterior y siguiente.
- Buscador local por palabras o frases en la versión activa.
- Versículo del día.
- Favoritos y notas personales por versión.
- Copiar y compartir versículos incluyendo el nombre de la versión.
- Modo claro, oscuro o igual al sistema.
- Tamaño de letra y espaciado configurables.
- Última lectura independiente para cada versión.
- Opción para mantener la pantalla encendida durante la lectura.
- Diseño adaptable para teléfonos Android.
- Sin anuncios, analítica ni rastreadores.

## Tecnología

- HTML, CSS y JavaScript.
- Capacitor 8.
- Proyecto Android nativo incluido.
- Reina-Valera 1909 almacenada localmente en JSON.
- Biblia del Oso 1569 normalizada desde GetBible API v2 (`sse`) y guardada localmente en IndexedDB.
- Preferencias, favoritos y notas almacenados localmente en el dispositivo.

## Carpetas principales

```text
BibliaVida-Android-v1.2.1/
├── www/                    # Aplicación web móvil y texto RVR 1909
├── android/                # Proyecto nativo Android
├── resources/              # Icono y pantalla de inicio
├── capacitor.config.json
├── package.json
└── GUIA_GENERAR_APK.md
```

## Abrir el proyecto

Consulta **GUIA_GENERAR_APK.md**. El proyecto conserva el identificador `com.proca.bibliavida`, usa la versión `1.2.1` y el código de versión Android `4`.

## Texto bíblico

Consulta **AVISO_TEXTO_BIBLICO.md** para la identificación y procedencia de cada módulo.

## Privacidad

Consulta **PRIVACIDAD.md**. La aplicación no incluye publicidad, analítica, cuentas ni servidores propios. El permiso de Internet se usa únicamente para la descarga opcional de la Biblia del Oso 1569; los favoritos, notas, configuración y progreso permanecen en el teléfono.
