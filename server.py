import http.server
import socketserver
import webbrowser

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"✨ Магия запущена! Открой браузер: http://localhost:{PORT}")
    print("Чтобы остановить сервер, нажми красный квадрат вверху PyCharm.")
    webbrowser.open(f"http://localhost:{PORT}")
    httpd.serve_forever()