@echo off
echo Starting Jaipur Real Estate Portal...
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo Starting Backend Server (Port 5000)...
cd ..\backend
start "Backend Server" cmd /k "npm run dev"

echo.
echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server (Port 3000)...
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul