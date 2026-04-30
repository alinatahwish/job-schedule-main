@echo off
setlocal

cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or not in PATH.
  exit /b 1
)

where python >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Python is not installed or not in PATH.
  echo Install Python 3 and ensure "Add python.exe to PATH" is enabled.
  exit /b 1
)

if not exist node_modules (
  echo Installing dependencies...
  call npm.cmd install
  if errorlevel 1 (
    echo [ERROR] Failed to install dependencies.
    exit /b 1
  )
)

echo Starting server on http://localhost:3000
node backend\server.js
