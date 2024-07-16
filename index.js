const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require("./routes/users");
const gameRoutes = require("./routes/game");
const indexRoutes = require("./routes/index");
const checkAuthentication = require("./middleware/checkAuthentication");

const app = express();

// Middleware setup
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// View engine setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/game", gameRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
