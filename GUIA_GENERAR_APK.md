# 📱 Generar Biblia Vida v1.2.4 con Android Studio

## Importante antes de abrir Android Studio

El ZIP fuente no trae `biblia-oso1569.json`. La forma recomendada es usar **GitHub Actions**, porque ese flujo descarga, convierte y valida el texto antes de sincronizar Android.

Para una compilación manual, primero debes colocar un archivo válido en:

```text
www/data/biblia-oso1569.json
```

Después ejecuta:

```bash
npm ci
npx cap sync android
npx cap open android
```

## Generar una APK de prueba

1. Espera la sincronización de Gradle.
2. Abre **Build → Build APK(s)**.
3. La salida normalmente queda en:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## Generar una versión firmada

1. Abre **Build → Generate Signed App Bundle or APK**.
2. Selecciona APK o Android App Bundle.
3. Usa la firma permanente del proyecto.
4. Conserva el `.jks`, el alias y las contraseñas.
5. Compila la variante `release`.

## Datos actuales

- Nombre: Biblia Vida
- Versión: 1.2.4
- Código de versión: 7
- ID de aplicación: `com.proca.bibliavida`
- Android mínimo: API 24
- Android objetivo: API 36
