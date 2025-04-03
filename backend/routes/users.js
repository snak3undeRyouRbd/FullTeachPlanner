// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Получить пользователя по ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT id, role, name, surname, email FROM users WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Пользователь не найден' });
      return;
    }
    res.json(row);
  });
});

// Получить события пользователя
router.get('/:id/events', (req, res) => {
  const { id } = req.params;
  
  db.all(`
    SELECT e.* 
    FROM events e
    JOIN event_participants ep ON e.id = ep.event_id
    WHERE ep.user_id = ?
    UNION
    SELECT e.* 
    FROM events e
    WHERE e.creator_id = ?
  `, [id, id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;