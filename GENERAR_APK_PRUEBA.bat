@echo off
title Biblia Vida - Generar APK de prueba
cd /d "%~dp0"
echo.
echo ============================================
echo   BIBLIA VIDA - GENERAR APK DE PRUEBA
echo ============================================
echo.
call npm install
if errorlevel 1 goto error
call npm run android:sync
if errorlevel 1 goto error
cd android
call gradlew.bat assembleDebug
if errorlevel 1 goto error
cd ..
echo.
echo APK generada correctamente.
echo Ubicacion:
echo android\app\build\outputs\apk\debug\app-debug.apk
echo.
start "" "android\app\build\outputs\apk\debug"
pause
exit /b 0
:error
echo.
echo No se pudo generar la APK.
echo Abre primero el proyecto con Android Studio para instalar y configurar el Android SDK.
pause
