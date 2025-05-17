from flask import Blueprint

# Создание основного Blueprint'а
main = Blueprint('main', __name__)

# Импорт всех маршрутов
from app.routes import users, events, tasks, auth, frontend