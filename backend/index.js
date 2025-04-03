require('dotenv').config();
const app = require('./app'); // Импортируем app из app.js

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));