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

// Generate random cards
const generateCards = () => {
  const suits = ["s", "c", "d", "h"];
  const values = Array.from({ length: 9 }, (_, i) =>
    (i + 2).toString()
  ).concat(["j", "q", "k", "a"]);
  const cards = [];

  for (let i = 0; i < 18; i++) {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    cards.push({ suit, value, state: "hidden" });
  }

  return cards;
};

// Route to handle game view for a specific user (authentication required)
router.get("/:username", isAuthenticated, (req, res) => {
  const { username } = req.params;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).send("User not found");
  }

  const cards = generateCards();
  res.render("game", { user, cards });
});

module.exports = router;
