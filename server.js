import express from "express";

const app = express();
const PORT = 5000;

app.use(express.json());

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`server started listing on PORT: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
