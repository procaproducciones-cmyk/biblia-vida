# Generar la APK sin Android Studio

Esta versión de **Biblia Vida** ya incluye un flujo automático de GitHub Actions. GitHub compilará la aplicación en sus servidores y dejará la APK lista para descargar.

## Lo que necesitas

- Una cuenta gratuita de GitHub.
- Un navegador web.
- El archivo ZIP de Biblia Vida descomprimido.

No necesitas Android Studio ni instalar herramientas Android.

## Paso 1. Crear un repositorio

1. Entra a GitHub e inicia sesión.
2. Pulsa **New repository**.
3. Escribe como nombre: `biblia-vida`.
4. Puedes dejarlo **Private** si no deseas publicar el código.
5. No marques las opciones para crear README, .gitignore o licencia.
6. Pulsa **Create repository**.

## Paso 2. Subir el proyecto

1. Dentro del repositorio nuevo, pulsa **uploading an existing file**.
2. Descomprime el ZIP de Biblia Vida en tu computadora.
3. Abre la carpeta `BibliaVida-Android-v1.2.2`.
4. Selecciona todo su contenido, incluida la carpeta `.github`.
5. Arrastra los archivos al área de carga de GitHub.
6. Espera a que termine la carga.
7. En la parte inferior, pulsa **Commit changes**.

> Importante: debes subir el contenido que está dentro de la carpeta, no la carpeta exterior completa. En la raíz del repositorio deben verse `android`, `www`, `.github`, `package.json` y los demás archivos.

## Paso 3. Generar la APK

El primer proceso debe comenzar automáticamente después de subir los archivos.

1. Abre la pestaña **Actions** del repositorio.
2. En el lado izquierdo, pulsa **Generar APK Biblia Vida**.
3. Si no comenzó automáticamente, pulsa **Run workflow** y luego el botón verde **Run workflow**.
4. Espera a que el proceso muestre una marca verde.

## Paso 4. Descargar la APK

1. Abre la ejecución que terminó con la marca verde.
2. Baja hasta la sección **Artifacts**.
3. Pulsa **Biblia-Vida-APK**.
4. Se descargará un ZIP pequeño.
5. Descomprímelo y encontrarás:

`Biblia-Vida-v1.2.2.apk`

Ese archivo se puede enviar por WhatsApp, subir a tu página web o instalar en un teléfono Android.

## Instalar en el teléfono

1. Pasa el archivo APK al teléfono.
2. Ábrelo desde Descargas o el administrador de archivos.
3. Android puede pedir permiso para **Instalar aplicaciones desconocidas** desde el navegador o administrador de archivos usado.
4. Activa el permiso solo para esa aplicación.
5. Regresa y pulsa **Instalar**.

## Nota sobre esta primera APK

La APK generada por este flujo es una compilación **debug**, adecuada para probar la aplicación y compartir las primeras pruebas. Android la firma automáticamente con una clave de depuración.

Antes del lanzamiento público definitivo prepararemos una APK de **release** firmada con una clave permanente de Proca Corporación. Esa clave debe conservarse siempre, porque Android usa la misma firma para permitir futuras actualizaciones de la aplicación.
