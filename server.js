import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/url.route.js";
import errorHandler from "./middlewares/error.js";
import corsMiddleware from "./config/cors.js";
import logger from "./middlewares/logger.js";

//for reading env variables
dotenv.config();

// express app
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(logger); // Log requests
app.use(corsMiddleware); // Apply CORS middleware
app.use(express.json());

// Routes
// it mounts the urlRoutes router to handle all routes starting with /api/urls.
app.use("/api/urls", urlRoutes);

// Error handler
app.use(errorHandler);

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
