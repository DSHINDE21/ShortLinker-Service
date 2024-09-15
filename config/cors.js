import cors from "cors";

// Define CORS options
export const corsOptions = {
  origin: "*", // ToDo: define specific domains
  credentials: true,
};

// Export CORS middleware
export default cors(corsOptions);
