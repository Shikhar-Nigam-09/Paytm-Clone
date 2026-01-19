const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // 1. Check if header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Unauthorized"
    });
  }

  // 2. Extract token
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 4. Attach userId to request
    req.userId = decoded.userId;

    // 5. Move to next middleware / route
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Unauthorized"
    });
  }
}

module.exports = {
  authMiddleware
};
