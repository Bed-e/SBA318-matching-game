// routes/game.js
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
  const suits = ["s", "c", "d", "h"]; // Spades, Clubs, Diamonds, Hearts
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

  // Create pairs of matching values with different suits
  const usedValues = [];
  while (cards.length < 18) {
    // We need 9 pairs (18 cards)
    const value = values[Math.floor(Math.random() * values.length)];
    if (!usedValues.includes(value)) {
      usedValues.push(value);
      const suit1 = suits[Math.floor(Math.random() * suits.length)];
      let suit2;
      do {
        suit2 = suits[Math.floor(Math.random() * suits.length)];
      } while (suit2 === suit1);

      cards.push({ suit: suit1, value, id: cards.length, state: "hidden" });
      cards.push({ suit: suit2, value, id: cards.length, state: "hidden" });
    }
  }

  // Shuffle the cards
  cards.sort(() => Math.random() - 0.5);

  res.render("game", {
    username: user.username,
    highScore: user.highScore,
    cards,
  });
});

// Update high score
router.post("/:username/update-score", checkAuthentication, (req, res) => {
  const { username } = req.params;
  const { score } = req.body;
  const user = users.find((u) => u.username === username);

  if (user && score > user.highScore) {
    user.highScore = score;
  }

  res.redirect(`/users/${username}/profile`);
});

// Handle end game scenario
router.post("/:username/end", checkAuthentication, (req, res) => {
  const { username } = req.params;
  const { score } = req.body;
  const user = users.find((u) => u.username === username);

  if (user) {
    if (score > user.highScore) {
      user.highScore = score;
    }
    res.status(200).send("Game ended");
  } else {
    res.status(404).send("User not found");
  }
});

module.exports = router;
