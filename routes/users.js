const express = require("express");
const router = express.Router();
const users = require("../users");

// Route to display users and their high scores
router.get("/", (req, res) => {
  res.render("users", { users });
});

// Route to handle user login and creation
router.post("/login", (req, res) => {
  const { username } = req.body;
  let user = users.find((u) => u.username === username);

  if (!user) {
    user = { username, highScore: 0 };
    users.push(user);
  }

  res.redirect(`/game/${username}`);
});

module.exports = router;
