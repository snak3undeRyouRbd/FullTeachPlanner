const express = require("express");
const path = require("path");

const app = express();

// Настройки Express
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, '../frontend/build'))); // React статика

// API routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Data from backend' });
});

// Маршруты Express
app.use("/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/users"));
app.use("/api/events", require("./routes/events"));
// ... другие API-маршруты

// Hybrid Route Handler
app.get(['/', '/events', '/tasks', '/profile'], (req, res) => {
  res.render('react-app', {
    title: 'My App', // данные для EJS
    reactApp: true
  });
});

// Для всех остальных маршрутов - React SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

module.exports = app;