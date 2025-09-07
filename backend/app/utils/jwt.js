const jwt = require("jsonwebtoken");

function signToken(payload, expiresIn = "3600s") {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
}

module.exports = { signToken, verifyToken };
