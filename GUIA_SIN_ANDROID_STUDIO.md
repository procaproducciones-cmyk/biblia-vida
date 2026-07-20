# Generar Biblia Vida v1.2.4 sin Android Studio

GitHub Actions descargará y validará la Biblia del Oso, la incluirá dentro de la aplicación y compilará la APK.

## Paso 1. Preparar el repositorio

1. Crea o abre tu repositorio `biblia-vida` en GitHub.
2. Descomprime `BibliaVida-Android-v1.2.4-Cache-Limpio.zip`.
3. Abre la carpeta `BibliaVida-Android-v1.2.4-Cache-Limpio`.
4. Sube **todo el contenido interno**, incluida la carpeta oculta `.github`.
5. En la raíz del repositorio deben verse `android`, `www`, `.github`, `scripts`, `package.json` y los demás archivos.
6. Confirma la carga con **Commit changes**.

> No subas únicamente la carpeta `www`. El flujo necesita también `.github`, `scripts`, `android`, `package.json` y `package-lock.json`.

## Paso 2. Generar la APK

1. Abre la pestaña **Actions**.
2. Selecciona **Generar APK Biblia Vida**.
3. Pulsa **Run workflow** y confirma con el botón verde.
4. Espera a que todos los pasos tengan marca verde.

Durante el proceso, GitHub:

- descarga la Biblia del Oso;
- usa una descarga alternativa por 66 libros si la primera falla;
- valida libros, capítulos y versículos;
- sincroniza Capacitor;
- comprueba que el archivo esté dentro de Android;
- compila la APK;
- vuelve a comprobar el archivo dentro de la APK terminada.

Si una validación falla, el proceso queda rojo y no entrega una APK incompleta.

## Paso 3. Descargar

1. Abre la ejecución terminada en verde.
2. Baja hasta **Artifacts**.
3. Descarga **Biblia-Vida-APK**.
4. Descomprime el archivo descargado.
5. Encontrarás `Biblia-Vida-v1.2.4.apk`.

## Paso 4. Instalar correctamente

Para esta prueba concreta:

1. Desinstala del teléfono Biblia Vida 1.2.3.
2. Instala `Biblia-Vida-v1.2.4.apk`.
3. Abre la aplicación.
4. Selecciona **Biblia del Oso 1569**.
5. Comprueba que abra inmediatamente, incluso sin conexión.

La desinstalación previa es importante porque la 1.2.3 pudo guardar un error 404 en el caché del navegador interno.

## Firma

La APK de GitHub Actions es una compilación `debug`, útil para pruebas. Para publicar en Google Play debes generar un AAB o APK `release` con la misma firma permanente usada en versiones anteriores.
