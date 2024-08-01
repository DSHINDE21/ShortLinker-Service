import Url from "../models/Url.model.js";

const createShortUrl = async (req, res, next) => {
  console.log("reached here...");
  try {
    const { originalUrl } = req.body;
    // Todo: Simple logic is used as of now, later made special logic
    const shortUrl = Math.random().toString(16).substring(2, 6);

    if (!originalUrl) {
      return res.status(400).json({
        success: 0,
        message: "originalUrl is required field",
        data: {},
      });
    }

    //check if url already exists
    const isUrlExists = await Url.findOne();
    if (isUrlExists) {
      return res.status(400).json({
        success: 0,
        message: "originalUrl already shortened",
        data: {},
      });
    }

    const newUrl = await Url.create({
      originalUrl,
      shortUrl,
    });

    res.status(201).json({
      success: 1,
      message: "Request Successfull",
      data: newUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

const getAllUrls = async (req, res, net) => {
  try {
    const urls = await Url.find({});

    res.status(200).json({
      success: 1,
      message: "Request Successfull",
      data: urls,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

const getUrlByShortUrl = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    if (!shortUrl) {
      return res.status(400).json({
        success: 0,
        message: "shortUrl is a required field",
        data: {},
      });
    }

    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({
        success: 0,
        message: "URL not found",
        data: {},
      });
    }

    return res.status(200).json({
      success: 1,
      message: "Request successful",
      data: url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: 0,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const redirectUrl = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    console.log("shortUrl", shortUrl);
    if (!shortUrl) {
      return res.status(400).json({
        success: 0,
        message: "shortUrl is a required field",
        data: {},
      });
    }

    const url = await Url.findOne({ shortUrl }).exec();
    console.log("url", url);
    if (!url) {
      return res.status(400).json({
        success: 0,
        message: "URL not found",
        data: {},
      });
    }

    res.status(301).redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: 0,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const updateUrl = async (req, res, next) => {
  const { shortUrl } = req.params;
  const { originalUrl } = req.body;

  if (!shortUrl || !originalUrl) {
    return res.status(400).json({
      success: 0,
      message:
        "shortUrl in route params and originalUrl in request body is required",
      data: {},
    });
  }

  try {
    const url = await Url.findOneAndUpdate(
      { shortUrl },
      { originalUrl },
      { new: true }
    );

    if (!url) {
      return res.status(400).json({
        success: 0,
        message: "URL not found for update",
        data: {},
      });
    }

    res.status(200).json({
      success: 1,
      message: "URL updated successfully",
      data: url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: 0,
      message: "Internal Server Error",
      data: {},
    });
  }
};
export { createShortUrl, getAllUrls, getUrlByShortUrl, redirectUrl, updateUrl };
