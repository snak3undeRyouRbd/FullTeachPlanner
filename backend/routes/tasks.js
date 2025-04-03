const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const tasks = [
    { title: "Решить уравнения", dueDate: "2025-03-10" },
    { title: "Написать эссе", dueDate: "2025-03-12" },
  ];
  res.render("tasks", { title: "Задания", tasks });
});

module.exports = router;
