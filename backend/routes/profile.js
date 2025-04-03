const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const user = { name: "John Dow", role: "Студент" };
  res.render("profile", { title: "Профіль", user });
});

router.get("/edit", (req, res) => {
  const user = { name: "John Dow", role: "Студент" };
  res.render("profile_edit", { title: "Профіль", user });
});


module.exports = router;
