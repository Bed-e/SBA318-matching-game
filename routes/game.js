const express = require("express");
const router = express.Router();
const users = require("../users");
const authenticateUser = require("../middleware/auth");

// Middleware to check if user is authenticated via session
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

// Route to handle game view for a specific user (authentication required)
router.get("/:username", isAuthenticated, (req, res) => {
  const { username } = req.params;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.render("game", { user });
});

// Route to handle game logic and update score (authentication required)
router.post("/:username/play", isAuthenticated, (req, res) => {
  const { username } = req.params;
  const { score } = req.body;
  const user = req.session.user;

  if (user.username !== username) {
    return res.status(403).send("Forbidden");
  }

  // Assuming `score` is calculated on the server side based on the game logic
  if (score > user.highScore) {
    user.highScore = score;
  }

  res.redirect(`/game/${username}`);
});

module.exports = router;
