// routes/users.js
const express = require("express");
const router = express.Router();
const users = require("../users");
const checkAuthentication = require("../middleware/checkAuthentication");

// Render the registration page
router.get("/register", (req, res) => {
  res.render("register");
});

// Handle registration
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  let user = users.find((u) => u.username === username);
  if (user) {
    return res.status(409).send("User already exists");
  }

  // Create new user
  user = { username, password, highScore: 0 };
  users.push(user); // Simulated database operation

  // Log the new user creation
  console.log(`User ${username} created`);

  // Redirect to login after successful registration
  res.redirect("/");
});

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

// Render high scores page
router.get("/high-scores", (req, res) => {
  const topUsers = [...users]
    .sort((a, b) => b.highScore - a.highScore)
    .slice(0, 10);
  res.render("high-scores", { topUsers });
});

// Handle updating high score
router.post("/:username/highscore", (req, res) => {
  const { username } = req.params;
  const { highScore } = req.body;

  let user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).send("User not found");
  }

  if (highScore > user.highScore) {
    user.highScore = highScore;
  }

  res.status(200).send("High score updated");
});

// Render the change password page
router.get("/:username/change-password", checkAuthentication, (req, res) => {
  const { username } = req.params;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.render("change-password", { user });
});

// Handle password change
router.post("/:username/change-password", checkAuthentication, (req, res) => {
  const { username } = req.params;
  const { oldPassword, newPassword } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).send("User not found");
  }

  if (user.password !== oldPassword) {
    return res
      .status(401)
      .send("Authentication failed. Old password is incorrect.");
  }

  user.password = newPassword;
  console.log(`Password for user ${username} changed`);

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error changing password");
    }
    res.redirect("/");
  });
});

// Handle account deletion
router.post("/:username/delete", checkAuthentication, (req, res) => {
  const { username } = req.params;
  const userIndex = users.findIndex((u) => u.username === username);

  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  users.splice(userIndex, 1);
  console.log(`User ${username} deleted`);

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error deleting account");
    }
    res.redirect("/");
  });
});

module.exports = router;
