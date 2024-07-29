import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//for reading env variables
dotenv.config();

// express app
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

const startServer = () => {
  try {
    // connect to db
    connectDB();

    // start & listen to the request
    app.listen(PORT, () => {
      console.log(`server started listing on PORT: ${PORT}`);
    });
  } catch (e) {
    // error handling
    console.log(e);
  }
};

startServer();
