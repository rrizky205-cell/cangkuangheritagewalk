# ==============================================================================
# Cangkuang Heritage Walk - Localhost Web Server (PowerShell HttpListener)
# ==============================================================================
# Port: 8080
# Mendukung MIME Types: .html, .css, .js, .json, .jpg, .png, .webp, .svg, .mp3, .ogg
# Mendukung URL decoding (folder berspasi) & API /api/custom-images
# ==============================================================================

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$port = 8080
$baseDir = if ($PSScriptRoot) { $PSScriptRoot } else { $PWD.Path }

$listener = New-Object System.Net.HttpListener
try {
    $listener.Prefixes.Add("http://localhost:$port/")
    try { $listener.Prefixes.Add("http://127.0.0.1:$port/") } catch {}
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "   Cangkuang Heritage Walk Server Running on:            " -ForegroundColor Yellow
    Write-Host "   http://localhost:$port/                               " -ForegroundColor Cyan
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "Tekan Ctrl+C untuk menghentikan server.`n" -ForegroundColor DarkGray
} catch {
    Write-Host "Gagal memulai server di port $($port): $_" -ForegroundColor Red
    exit 1
}

function Send-Http-Response($response, $bytes, $contentType, $statusCode = 200) {
    try {
        if ($null -eq $bytes) { $bytes = [byte[]]@() }
        elseif ($bytes -isnot [byte[]]) { $bytes = [byte[]]$bytes }
        $response.StatusCode = $statusCode
        $response.ContentType = $contentType
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Pragma, Cache-Control")
        $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0")
        $response.ContentLength64 = $bytes.Length
        if ($bytes.Length -gt 0) {
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        $response.OutputStream.Flush()
        $response.Close()
    } catch {
        try { if ($response) { $response.Close() } } catch {}
    }
}

while ($listener.IsListening) {
    $context = $null
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        $rawPath = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath)
        $method = $request.HttpMethod

        if ($method -eq "OPTIONS") {
            Send-Http-Response -response $response -bytes @() -contentType "text/plain" -statusCode 204
            continue
        }

        # API: Kustomisasi Gambar Otomatis
        if ($rawPath -eq "/api/custom-images" -or $rawPath -eq "/api/custom-images.json") {
            $mapping = @{}
            $imageExts = @('.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg')
            $menuFolders = Get-ChildItem -Path $baseDir -Directory -Filter "Menu *" -ErrorAction SilentlyContinue
            if ($menuFolders) {
                foreach ($f in $menuFolders) {
                    $foundFile = Get-ChildItem -Path $f.FullName -File -ErrorAction SilentlyContinue | 
                        Where-Object { $imageExts -contains $_.Extension.ToLower() } | 
                        Select-Object -First 1
                    if ($foundFile) {
                        $encodedFolder = [System.Uri]::EscapeDataString($f.Name)
                        $encodedFile = [System.Uri]::EscapeDataString($foundFile.Name)
                        $mapping[$f.Name] = "$encodedFolder/$encodedFile"
                    }
                }
            }
            $json = ConvertTo-Json $mapping -Compress
            if (!$json) { $json = "{}" }
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
            Send-Http-Response -response $response -bytes $bytes -contentType "application/json; charset=utf-8"
            continue
        }

        # Menentukan file yang diminta
        $targetRel = $rawPath.TrimStart('/')
        if ($targetRel -eq "" -or $targetRel -eq "index") {
            $targetRel = "index.html"
        }

        $targetRel = $targetRel.Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $fullPath = Join-Path $baseDir $targetRel

        if (!(Test-Path $fullPath -PathType Leaf)) {
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1><p>File tidak ditemukan: $targetRel</p>")
            Send-Http-Response -response $response -bytes $bytes -contentType "text/html; charset=utf-8" -statusCode 404
            continue
        }

        # Tentukan Content-Type
        $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
        $contentType = switch ($ext) {
            ".html" { "text/html; charset=utf-8" }
            ".htm"  { "text/html; charset=utf-8" }
            ".css"  { "text/css; charset=utf-8" }
            ".js"   { "application/javascript; charset=utf-8" }
            ".json" { "application/json; charset=utf-8" }
            ".png"  { "image/png" }
            ".jpg"  { "image/jpeg" }
            ".jpeg" { "image/jpeg" }
            ".webp" { "image/webp" }
            ".gif"  { "image/gif" }
            ".svg"  { "image/svg+xml" }
            ".ico"  { "image/x-icon" }
            ".mp3"  { "audio/mpeg" }
            ".ogg"  { "audio/ogg" }
            ".wav"  { "audio/wav" }
            default { "application/octet-stream" }
        }

        $bytes = [System.IO.File]::ReadAllBytes($fullPath)
        Send-Http-Response -response $response -bytes $bytes -contentType $contentType -statusCode 200

    } catch {
        try { if ($context -and $context.Response) { $context.Response.Close() } } catch {}
    }
}
