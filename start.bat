@echo off
echo ===================================================
echo Starting Smart Placement Management System
echo ===================================================

echo Starting Node.js Backend Server on Port 3000...
start cmd /k "node server.js"

echo Starting React Vite Frontend on Port 5173...
start cmd /k "cd client && npm run dev"

echo Both servers are starting up! 
echo Please wait a few seconds, then open a browser and go to:
echo http://localhost:3000/index1.html
echo ===================================================
