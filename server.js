import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/url.route.js";

//for reading env variables
dotenv.config();

// express app
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// Routes
// it mounts the urlRoutes router to handle all routes starting with /api/urls.
app.use("/api/urls", urlRoutes);

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
