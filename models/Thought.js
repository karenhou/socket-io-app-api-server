const mongoose = require("mongoose");

const ThoughtSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      required: true,
      max: 2500,
    },
    mood: {
      type: String,
      max: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Thought", ThoughtSchema);
