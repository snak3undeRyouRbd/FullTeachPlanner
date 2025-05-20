import os
from flask import send_from_directory
from app.routes import main

@main.route('/', defaults={'path': ''})
@main.route('/<path:path>')
def serve_frontend(path):
    base = os.path.join(os.getcwd(), 'app', 'static', 'frontend')
    if path != "" and os.path.exists(os.path.join(base, path)):
        return send_from_directory(base, path)
    else:
        return send_from_directory(base, 'index.html')