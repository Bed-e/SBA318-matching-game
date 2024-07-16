const express = require("express");
const router = express.Router();
const users = require("../users");
const checkAuthentication = require("../middleware/checkAuthentication");

// Render the user profile page
router.get("/:username/profile", checkAuthentication, (req, res) => {
  const { username } = req.params;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.render("profile", { user });
});

// Handle password change
router.post("/:username/change-password", checkAuthentication, (req, res) => {
  const { username } = req.params;
  const { newPassword } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).send("User not found");
  }

  user.password = newPassword;
  res.redirect(`/users/${username}/profile`);
});

// Render the registration page
router.get("/register", (req, res) => {
  res.render("register");
});

// Handle user registration
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    return res.status(400).send("Username already taken");
  }

  const newUser = { username, password, highScore: 0 };
  users.push(newUser);
  req.session.user = newUser;
  res.redirect(`/users/${username}/profile`);
});

module.exports = router;
