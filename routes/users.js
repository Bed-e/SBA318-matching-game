const express = require("express");
const router = express.Router();
const users = require("../users");

// Render the user profile page
router.get("/:username/profile", (req, res) => {
  const { username } = req.params;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.render("profile", { user });
});

// Handle password change
router.post("/:username/change-password", (req, res) => {
  const { username } = req.params;
  const { newPassword } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).send("User not found");
  }

  user.password = newPassword;
  res.redirect(`/users/${username}/profile`);
});

module.exports = router;
