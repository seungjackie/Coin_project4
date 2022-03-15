// package
const mongoose = require("mongoose");
const config = require("config");
// URI
const uri = config.get("mongoURI");

// Connect MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;