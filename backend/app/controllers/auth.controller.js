const User = require("../models/user.model");
const { signToken } = require("../utils/jwt");

// Create Account
async function createAccount(req, res) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName) {
      return res.status(400).json({ error: true, message: "Full Name is required" });
    }
    if (!email) {
      return res.status(400).json({ error: true, message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: true, message: "Password is required" });
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.json({ error: true, message: "User already exists" });
    }

    const user = new User({ fullName, email, password });
    await user.save();

    const accessToken = signToken({ id: user._id }, "36000m");

    return res.json({
      error: false,
      user,
      accessToken,
      message: "Account created successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
}

// Login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });

    const userInfo = await User.findOne({ email });
    if (!userInfo) {
      return res.status(400).json({ message: "User not found" });
    }

    if (userInfo.email === email && userInfo.password === password) {
      const accessToken = signToken({ id: userInfo._id }, "36000m");

      return res.json({
        error: false,
        message: "Login Successful",
        user: userInfo,
        accessToken,
      });
    } else {
      return res.status(400).json({ error: true, message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
}

// Get User
async function getUser(req, res) {
  try {
    const userId = req.user.id;

    const isUser = await User.findById(userId);
    if (!isUser) {
      return res.sendStatus(401);
    }

    return res.json({
      user: {
        fullName: isUser.fullName,
        email: isUser.email,
        _id: isUser._id,
        createdOn: isUser.createdOn,
      },
      message: "",
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
}

module.exports = { createAccount, login, getUser };
