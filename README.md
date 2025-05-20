# 🧠 FullTeachPlanner

Це веб-додаток для вчителів, учнів та батьків з можливістю:
- створення подій та завдань,
- ведення шкільного календаря,
- керування користувачами,
- перегляду статистики та профілю.

## 🔧 Встановлення та запуск

1. **Клонування репозиторію**  
   ```bash
   git clone https://github.com/ВАШ_ГІТ/fullteachplanner.git
   cd fullteachplanner
   ```

2. **Встановлення залежностей**  
   ```bash
   pip install -r requirements.txt
   ```

3. **Запуск бекенду**  
   ```bash
   python run.py
   ```

4. **(Опціонально) Запуск фронтенду**
   ```bash
   cd app/static/frontend
   npm install
   npm run dev
   ```

## 📁 Структура

- `app/` — основна логіка застосунку на Flask
- `models/` — моделі бази даних SQLAlchemy
- `routes/` — маршрутизація API
- `static/frontend` — React інтерфейс

## 🛠 Технології

- Python, Flask
- SQLAlchemy
- SQLite / PostgreSQL
- React, Bootstrap
- WebSockets

## 🧪 Тестування

Додаток проходив ручне тестування та демонструвався на локальному сервері.

## 📜 Ліцензія

MIT або Creative Commons — на ваш розсуд.
