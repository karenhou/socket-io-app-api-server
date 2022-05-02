const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    //check this user doesn't exist
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
      throw new Error("Email already exist");
    }

    //check this user doesn't exist
    const usernameExist = await User.findOne({ username: req.body.username });

    if (usernameExist) {
      throw new Error("Username already exist");
    }

    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log("registerUser err ", err);
    res.status(400).json({
      msg: err.message,
    });
  }
});

// @desc    Login an existing user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("User not found");
    }
    // !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      throw new Error("wrong password");
    }
    // !validPassword && res.status(400).json("wrong password");

    console.log("loginUser", user);
    res.status(200).json({ user, id_token: generateToken(user._id) });
  } catch (err) {
    console.log("loginUser err ", err);
    res.status(400).json({
      msg: err.message,
    });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  registerUser,
  loginUser,
};
