const express = require("express");
const router = express.Router();
const users = require("../users");

// Route to handle game view for a specific user
router.get("/:username", (req, res) => {
  const { username } = req.params;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.render("game", { user });
});

module.exports = router;
