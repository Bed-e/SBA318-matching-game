const express = require("express");
const router = express.Router();
const users = require("../users");

// Route to display users and their high scores
router.get("/", (req, res) => {
  res.render("users", { users });
});

// Route to handle user login and creation
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  let user = users.find((u) => u.username === username);

  if (!user) {
    user = { username, password, highScore: 0 };
    users.push(user);
  } else if (user.password !== password) {
    return res.status(401).send("Authentication failed");
  }

  req.session.user = user; // Store user information in session
  res.redirect(`/users/profile/${username}`);
});

// Route to handle user profile
router.get("/profile/:username", (req, res) => {
  const { username } = req.params;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.render("profile", { user });
});

// Route to handle password change
router.post("/:username/change-password", (req, res) => {
  const { username } = req.params;
  const { newPassword } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).send("User not found");
  }

  user.password = newPassword;
  res.redirect(`/users/profile/${username}`);
});

module.exports = router;
