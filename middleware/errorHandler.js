// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message || "An unexpected error occurred",
  });
};
