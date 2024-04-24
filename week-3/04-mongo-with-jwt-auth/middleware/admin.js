// Middleware for handling auth
const jwt = require("jsonwebtoken");

async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  // If the user is admin, call next()
  // If the user is not admin, return 403 status code with a message "Forbidden"
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send("Forbidden");
  }
  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(403).send("Forbidden");
  }
  const tokenValue = tokenParts[1];
  let decoded;
  try {
    decoded = jwt.verify(tokenValue, "secret");
    if (!decoded.username || !decoded.password) {
      return res.status(403).send("Forbidden");
    } else next();
  } catch (e) {
    console.log(e);
    return res.status(403).send("Forbidden");
  }
}

module.exports = adminMiddleware;
