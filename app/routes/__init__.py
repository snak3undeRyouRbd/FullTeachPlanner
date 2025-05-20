import os
from flask import Blueprint, current_app, send_from_directory
from .auth import auth_bp  # ← вот это добавляем

frontend_bp = Blueprint("frontend", __name__)

@frontend_bp.route("/", defaults={"path": ""})
@frontend_bp.route("/<path:path>")
def serve_react(path):
    static_folder = current_app.static_folder
    file_path = os.path.join(static_folder, path)

    if path != "" and os.path.exists(file_path):
        return send_from_directory(static_folder, path)

    return send_from_directory(static_folder, "index.html")

def register_routes(app):
    app.register_blueprint(frontend_bp)
    app.register_blueprint(auth_bp)
