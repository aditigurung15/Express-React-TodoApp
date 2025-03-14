const mongoose = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => {
        console.log("connected to database");
      });
  } catch (error) {
    res.status(400).json({
      message: "not connected to database",
    });
  }
};

conn();
