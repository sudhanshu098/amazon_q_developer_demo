#!/bin/bash

# Start Redis server
echo "Starting Redis server..."
cd redis-stable && ./src/redis-server --daemonize yes --port 6379
cd ..

# Start backend server
echo "Starting backend server..."
cd backend
export PATH="/tmp/node/bin:$PATH"
npm start &
BACKEND_PID=$!
cd ..

# Start frontend server
echo "Starting frontend server..."
cd frontend
export PATH="/tmp/node/bin:$PATH"
npm start &
FRONTEND_PID=$!
cd ..

echo "Backend running on http://localhost:5000"
echo "Frontend running on http://localhost:3000"
echo "Press Ctrl+C to stop all servers"

# Wait for user to stop
wait $BACKEND_PID $FRONTEND_PID