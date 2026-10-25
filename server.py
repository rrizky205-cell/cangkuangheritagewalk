#!/usr/bin/env python3
"""
Candi Cangkuang Heritage Walk - Python Localhost Server
Usage: python server.py [port]
"""
import http.server
import socketserver
import webbrowser
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler

print(f"==========================================================")
print(f" 🏛️ CANDI CANGKUANG LOCALHOST SERVER (PYTHON)")
print(f" URL: http://localhost:{PORT}/")
print(f" Tekan Ctrl+C untuk menghentikan server.")
print(f"==========================================================")

webbrowser.open(f"http://localhost:{PORT}/")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer dihentikan.")
