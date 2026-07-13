@echo off
title Biblia Vida - Abrir en Android Studio
cd /d "%~dp0"
echo.
echo ============================================
echo   BIBLIA VIDA - PREPARAR PROYECTO ANDROID
echo ============================================
echo.
call npm install
if errorlevel 1 goto error
call npm run android:sync
if errorlevel 1 goto error
call npm run android:open
if errorlevel 1 goto error
exit /b 0
:error
echo.
echo Ocurrio un error. Revisa que Node.js y Android Studio esten instalados.
pause
