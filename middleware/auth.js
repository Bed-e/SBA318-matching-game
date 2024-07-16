const authenticateUser = (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).send("Authentication failed");
  }

  req.session.user = user; // Store user information in session
  next();
};

module.exports = authenticateUser;
