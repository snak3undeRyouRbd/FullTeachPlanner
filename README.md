Це веб-додаток для вчителів, учнів та батьків з можливістю:
- створення подій та завдань,
- ведення шкільного календаря,
- керування користувачами,
- перегляду статистики та профілю.

Запуск
   ```

2. **Встановлення залежностей**  

   pip install -r requirements.txt
 

3. **Запуск бекенду**  

   python run.py
   

4. Запуск фронтенду**

   cd app/static/frontend
   npm install
   npm run dev


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
