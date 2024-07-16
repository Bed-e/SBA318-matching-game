const express = require("express");
const router = express.Router();
const users = require("../users");
const checkAuthentication = require("../middleware/checkAuthentication");

// Render the game page
router.get("/:username/play", checkAuthentication, (req, res) => {
  const { username } = req.params;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).send("User not found");
  }

  // Generate cards
  const suits = ["s", "c", "d", "h"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "j",
    "q",
    "k",
    "a",
  ];
  const cards = [];

  for (let i = 0; i < 18; i++) {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    cards.push({ suit, value, id: i, state: "hidden" });
  }

  res.render("game", {
    username: user.username,
    highScore: user.highScore,
    cards,
  });
});

module.exports = router;
