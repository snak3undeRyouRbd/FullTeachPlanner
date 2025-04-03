// routes/events.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Получить все события
router.get('/', (req, res) => {
  db.all("SELECT * FROM events", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Получить событие по ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM events WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Событие не найдено' });
      return;
    }
    res.json(row);
  });
});

// Создать новое событие
router.post('/', (req, res) => {
  const { type, title, start_date, duration, content, is_hidden, location, creator_id } = req.body;
  
  db.run(
    `INSERT INTO events (type, title, start_date, duration, content, is_hidden, location, creator_id) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [type, title, start_date, duration, content, is_hidden, location, creator_id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Обновить событие
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { type, title, start_date, duration, content, is_hidden, location } = req.body;
  
  db.run(
    `UPDATE events 
     SET type = ?, title = ?, start_date = ?, duration = ?, content = ?, is_hidden = ?, location = ?
     WHERE id = ?`,
    [type, title, start_date, duration, content, is_hidden, location, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

// Удалить событие
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  db.run("DELETE FROM events WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

module.exports = router;