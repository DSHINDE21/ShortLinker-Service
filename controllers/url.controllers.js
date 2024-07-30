import Url from "../models/Url.model.js";

const createShortUrl = async (req, res, next) => {
  console.log("reached here...");
  try {
    const { originalUrl } = req.body;
    // Todo: Simple logic is used as of now, later made special logic
    const shortUrl = Math.random().toString(16).substring(2, 6);

    if (!originalUrl) {
      return res.status(400).json("originalUrl is required field");
    }

    //check if url already exists
    const isUrlExists = await Url.findOne();
    if (isUrlExists) {
      return res.status(400).json("originalUrl already shortened");
    }

    const newUrl = await Url.create({
      originalUrl,
      shortUrl,
    });

    res.status(201).json({
      success: true,
      newUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

export { createShortUrl };
