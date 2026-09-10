@echo off
REM Builds the site (incl. the search index) and serves it on http://127.0.0.1:4321
REM Double-click, leave the window open. Close it to stop.
cd /d "%~dp0"
echo.
echo   Building...
call npm run build >nul 2>&1
echo   Serving   http://127.0.0.1:4321
echo.
start "" http://127.0.0.1:4321/
npx astro preview --host 127.0.0.1 --port 4321
