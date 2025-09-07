const { verifyToken } = require("../utils/jwt");

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    const decoded = await verifyToken(token);
    req.user = decoded;

    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

module.exports = { authenticateToken };
