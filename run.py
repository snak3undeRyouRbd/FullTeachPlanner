from app import create_app
from flask_socketio import SocketIO
import eventlet

app = create_app()
socketio = SocketIO(app, cors_allowed_origins="*")

if __name__ == '__main__':
    socketio.run(app, debug=True)