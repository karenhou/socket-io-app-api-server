const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

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
    res.status(200).json({ ...user, id_token: generateToken(user._id) });
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

// @desc    update existing user profile information
// @route   POST /api/auth/update-profile
// @access  Private
// TODO need to add update user information like upload pix and background pix, etc
const updateUser = asyncHandler(async (req, res) => {
  try {
    // const user = await User.findOne({ email: req.body.email });
    // if (!user) {
    //   throw new Error("User not found");
    // }
    // // !user && res.status(404).json("user not found");
    // const validPassword = await bcrypt.compare(
    //   req.body.password,
    //   user.password
    // );
    // if (!validPassword) {
    //   throw new Error("wrong password");
    // }
    // // !validPassword && res.status(400).json("wrong password");
    // console.log("loginUser", user);
    // res.status(200).json({ user, id_token: generateToken(user._id) });
  } catch (err) {
    console.log("updateUser err ", err);
    res.status(400).json({
      msg: err.message,
    });
  }
});

// @desc    get user profile information
// @route   POST /api/auth/get-profile
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  try {
    //TODO, need to fetch
    console.log("getUser", req.user);
    res.status(200).json({ user: req.user });
  } catch (err) {
    console.log("getUser err ", err);
    res.status(400).json({
      msg: err.message,
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getUser,
};
