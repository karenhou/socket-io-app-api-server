const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
connectDB();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

//middleware
app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/thoughtRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API server is running! on ${PORT}`);
});
