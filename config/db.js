const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("Connected to MongoDB");
      }
    );
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
