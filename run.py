from app import create_app, socketio  # 👈 импортируем socketio из app/__init__.py

app = create_app()

if __name__ == '__main__':
    socketio.run(app, debug=True)
