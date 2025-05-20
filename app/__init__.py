import os
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from config import Config
from app.extensions import db

socketio = SocketIO(cors_allowed_origins="*")

def create_app():
    app = Flask(
        __name__,
        static_folder=os.path.join(os.path.dirname(__file__), "static", "frontend", "dist"),
        static_url_path=''
    )
    app.config.from_object(Config)

    db.init_app(app)
    socketio.init_app(app)
    CORS(app)

    from app import models
    from app.routes import register_routes
    register_routes(app)
    print("✅ auth_bp registered")

    with app.app_context():
        from app.models.schoolclass import SchoolClass
        print("✅ SchoolClass is visible")
        db.create_all()

    return app


