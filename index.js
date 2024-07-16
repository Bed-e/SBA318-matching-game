const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const port = 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Set the view engine to Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Custom middleware example
const customMiddleware = (req, res, next) => {
  console.log("Custom middleware executed");
  next();
};
app.use(customMiddleware);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Use the routes
app.use("/", require("./routes/index")); // Root route
app.use("/users", require("./routes/users")); // Users route
app.use("/game", require("./routes/game")); // Game route

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
