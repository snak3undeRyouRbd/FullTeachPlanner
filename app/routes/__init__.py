from flask import Blueprint
main = Blueprint('main', __name__)

# Подключение всех модулей
from app.routes import users, events, tasks, auth, frontend

