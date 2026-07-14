# 📱 Guía para generar la APK de Biblia Vida

## Requisitos en Windows

1. Instalar **Node.js**.
2. Instalar **Android Studio** con el Android SDK.
3. Descomprimir el proyecto en una carpeta fácil, por ejemplo:

```text
C:\BibliaVida
```

## Preparar el proyecto

Abre PowerShell o la terminal dentro de la carpeta y ejecuta:

```bash
npm install
npm run android:sync
npm run android:open
```

El último comando abrirá el proyecto en Android Studio.

## Generar una APK de prueba

Dentro de Android Studio:

1. Espera a que termine la sincronización de Gradle.
2. Abre el menú **Build**.
3. Selecciona **Build APK(s)**.
4. Al terminar, pulsa **locate** para abrir la carpeta del archivo.

La salida normalmente queda en:

```text
android\app\build\outputs\apk\debug\app-debug.apk
```

Esta APK sirve para probar e instalar manualmente.

## Generar la APK firmada para distribuir

Dentro de Android Studio:

1. Ve a **Build → Generate Signed App Bundle or APK**.
2. Selecciona **APK**.
3. Crea un archivo de firma o selecciona uno existente.
4. Guarda muy bien el archivo `.jks`, el alias y las contraseñas. Se necesitan para publicar futuras actualizaciones con la misma identidad.
5. Selecciona la variante **release**.
6. Finaliza el asistente.

La APK firmada normalmente quedará en:

```text
android\app\build\outputs\apk\release\app-release.apk
```

## Publicar en Google Play

Para Google Play se recomienda generar un **Android App Bundle (.aab)** desde el mismo asistente, seleccionando **Android App Bundle** en lugar de APK.

## Después de modificar HTML, CSS, JavaScript o la Biblia

Ejecuta nuevamente:

```bash
npm run android:sync
```

Después vuelve a compilar desde Android Studio.

## Datos actuales

- Nombre: Biblia Vida
- Versión: 1.2.1
- Código de versión: 3
- ID de aplicación: `com.proca.bibliavida`
- Android mínimo: API 24
- Android objetivo: API 36
