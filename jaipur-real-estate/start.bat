@echo off
echo Starting Jaipur Real Estate Portal...
echo.

echo Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo Installing Backend Dependencies...
cd ..\backend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "npm run dev"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Development Server...
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo Jaipur Real Estate Portal is starting!
echo ========================================
echo Backend API: http://localhost:5000
echo Frontend App: http://localhost:3000
echo ========================================
echo.
echo Press any key to exit...
pause > nul