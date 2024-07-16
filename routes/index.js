const express = require("express");
const router = express.Router();
const users = require("../users");

// Render the login page
router.get("/", (req, res) => {
  res.render("index", { title: "Login" });
});

// Handle login form submission
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (user && user.password === password) {
    req.session.user = user;
    res.redirect(`/users/${username}/profile`);
  } else {
    res.render("index", {
      error: "Invalid username or password",
      title: "Login",
    });
  }
});

module.exports = router;
