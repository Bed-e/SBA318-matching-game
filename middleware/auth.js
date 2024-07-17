// middleware/auth.js
const users = require("../users");

const authenticateUser = (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || user.password !== password) {
    const err = new Error("Authentication failed");
    err.status = 401;
    return next(err);
  }

  req.session.user = user;
  next();
};

module.exports = authenticateUser;
