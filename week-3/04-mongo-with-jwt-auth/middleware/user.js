const jwt = require("jsonwebtoken");
const { User } = require("../db");
async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).send("Forbidden");
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(403).send("Forbidden");
  }
  const decoded = jwt.verify(token, "secret");
  if (!decoded) {
    return res.status(403).send("Forbidden");
  }
  const user = await User.find({
    username: decoded.username,
    password: decoded.password,
  });
  if (!user) {
    return res.status(403).send("Forbidden");
  }
  next();
}

module.exports = userMiddleware;
