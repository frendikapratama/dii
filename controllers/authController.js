const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email dan password harus diisi" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Email tidak ditemukan" });
    }

    const fixedHash = user.password.replace(/^\$2y\$/, "$2b$");
    const isMatch = await bcrypt.compare(password, fixedHash);

    if (!isMatch) {
      return res.status(401).json({ error: "Password salah" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login gagal" });
  }
};
