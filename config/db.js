import mongoose from "mongoose";

mongoose.set("strictPopulate", false); // Disable strictPopulate warning

// Function to connect to the database
const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URL environment variable is not set.");
    process.exit(1);
  }

  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use the new URL parser to handle connection strings
      useUnifiedTopology: true, // Opt into using the new Unified Topology layer
    });
    console.log(`MongoDB connected: ${dbConnection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
