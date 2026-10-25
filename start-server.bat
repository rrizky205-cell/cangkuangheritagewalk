@echo off
title Candi Cangkuang Heritage Walk - Localhost Server
echo ==========================================================
echo  CANDI CANGKUANG HERITAGE WALK - LOCALHOST LAUNCHER
echo ==========================================================
echo  Memulai server lokal pada http://localhost:8080/ ...
echo  Browser Anda akan terbuka secara otomatis.
echo  Jangan tutup jendela ini selama sedang menggunakan website.
echo ==========================================================
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
