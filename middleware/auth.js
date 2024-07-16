const users = require("../users");

const authenticateUser = (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).send("Authentication failed");
  }

  req.session.user = user;
  next();
};

module.exports = authenticateUser;
