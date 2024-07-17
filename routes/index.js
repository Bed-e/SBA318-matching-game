// routes/index.js
const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/auth");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/login", authenticateUser, (req, res) => {
  const { username } = req.session.user;
  res.redirect(`/users/${username}/profile`);
});

module.exports = router;
