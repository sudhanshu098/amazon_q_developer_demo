#!/bin/bash

echo "Starting Jaipur Real Estate Portal..."
echo

echo "Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install backend dependencies"
    exit 1
fi

echo
echo "Installing Frontend Dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install frontend dependencies"
    exit 1
fi

echo
echo "Starting Backend Server (Port 5000)..."
cd ../backend
npm run dev &
BACKEND_PID=$!

echo
echo "Waiting for backend to start..."
sleep 3

echo "Starting Frontend Server (Port 3000)..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo
echo "Both servers are running..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait