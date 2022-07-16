const asyncHandler = require("express-async-handler");
const Thought = require("../models/Thought");

// @desc    get user thoughts
// @route   GET /api/user/get-thoughts
// @access  Private
const getThoughts = asyncHandler(async (req, res) => {
  console.log("getThoughts called querys", req.query);
  try {
    const thoughts = await Thought.find({
      email: req.query.email,
    });
    console.log("getThoughts", thoughts);
    res.status(200).json({ thoughts });
  } catch (err) {
    console.log("getThoughts err ", err);
    res.status(400).json({
      msg: err.message,
    });
  }
});

// @desc    post user thought
// @route   POST /api/user/post-thought
// @access  Private
const postThought = asyncHandler(async (req, res) => {
  console.log("postThought called ", req.body);
  try {
    const newThought = new Thought({
      username: req.body.username,
      email: req.body.email,
      content: req.body.content,
      mood: req.body.mood,
    });

    const result = await newThought.save();

    if (result) {
      const thoughts = await Thought.find({
        email: req.body.email,
      });
      res.status(200).json({ thoughts });
    }
  } catch (err) {
    console.log("postThought err ", err);
    res.status(400).json({
      msg: err.message,
    });
  }
});

module.exports = {
  getThoughts,
  postThought,
};
