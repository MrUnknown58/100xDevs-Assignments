const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  // If the user is an admin, call next()
  const { username, password } = req.headers;
  if (!username || !password) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const admin = await Admin.findOne({
      username: username,
      password: password,
    });
    if (!admin) res.status(401).send("Unauthorized");
    else next();
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
}

module.exports = adminMiddleware;
