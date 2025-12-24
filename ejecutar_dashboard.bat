@echo off
REM ============================================
REM Dashboard Educativo de Muestreo de Señales
REM Teorema de Nyquist-Shannon
REM ============================================

setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║   Dashboard Educativo de Procesamiento Digital de Señales  ║
echo ║              Teorema de Nyquist-Shannon                    ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM ============================================
REM 1. Verificar si Python está instalado
REM ============================================
echo [1/4] Verificando instalación de Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ❌ ERROR: Python no está instalado o no está en el PATH
    echo.
    echo Por favor:
    echo   1. Descarga Python desde: https://www.python.org/downloads/
    echo   2. IMPORTANTE: Marca "Add Python to PATH" durante la instalación
    echo   3. Reinicia este script
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version 2^>^&1') do set PYTHON_VERSION=%%i
echo ✅ Encontrado: %PYTHON_VERSION%
echo.

REM ============================================
REM 2. Crear entorno virtual
REM ============================================
echo [2/4] Creando entorno virtual...
if exist venv (
    echo ⚠️  Entorno virtual ya existe, usando existente
) else (
    python -m venv venv
    if errorlevel 1 (
        echo.
        echo ❌ ERROR: No se pudo crear el entorno virtual
        pause
        exit /b 1
    )
    echo ✅ Entorno virtual creado
)
echo.

REM ============================================
REM 3. Activar entorno y instalar dependencias
REM ============================================
echo [3/4] Instalando dependencias...
call venv\Scripts\activate.bat

REM Usar pip de forma silenciosa para instalar
python -m pip install --quiet --upgrade pip
python -m pip install --quiet Flask numpy

if errorlevel 1 (
    echo.
    echo ❌ ERROR: No se pudieron instalar las dependencias
    pause
    exit /b 1
)
echo ✅ Dependencias instaladas correctamente
echo.

REM ============================================
REM 4. Ejecutar servidor y abrir navegador
REM ============================================
echo [4/4] Iniciando servidor...
echo.
echo ✅ SERVIDOR INICIADO
echo.
echo 📊 Accede a: http://localhost:5000
echo.
echo ⏹️  Para detener: Presiona Ctrl+C en esta ventana
echo.

REM Esperar un poco para que el servidor inicie
timeout /t 2 /nobreak >nul

REM Abrir navegador automáticamente
start http://localhost:5000

REM Ejecutar el servidor Flask
python app.py

pause
