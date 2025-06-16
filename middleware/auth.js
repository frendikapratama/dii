const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(401).json({ error: "Token dibutuhkan" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token tidak valid" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ error: "Token kadaluarsa atau tidak valid" });

    req.user = user;
    next();
  });
};

module.exports = verifyToken;
