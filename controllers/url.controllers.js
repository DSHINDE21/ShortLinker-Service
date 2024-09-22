import { Error } from "mongoose";
import Url from "../models/Url.model.js";

const createShortUrl = async (req, res, next) => {
  console.log("reached here...");
  try {
    const { originalUrl } = req.body;

    // Check if originalUrl is provided in the request
    if (!originalUrl) {
      res.status(200);
      return next(new Error("originalUrl is a required field"));
    }

    // Check if the URL has already been shortened
    const isUrlExists = await Url.findOne({ originalUrl });
    if (isUrlExists) {
      return res.status(200).json({
        success: 0,
        message: "This URL has already been shortened.",
        data: isUrlExists,
      });
    }

    // Generate a unique short URL
    let shortCode;
    let isShortUrlUnique = false;

    while (!isShortUrlUnique) {
      shortCode = Math.random().toString(16).substring(2, 6); // Simple random short URL generator
      const existingShortUrl = await Url.findOne({
        shortUrl: `https://shortlinker-service.onrender.com/api/urls/redirect/${shortCode}`,
      });
      if (!existingShortUrl) {
        isShortUrlUnique = true; // Only break loop when shortUrl is unique
      }
    }

    const shortUrl = `https://shortlinker-service.onrender.com/api/urls/redirect/${shortCode}`;

    // Create and save new URL document
    const newUrl = await Url.create({
      originalUrl,
      shortUrl,
    });

    return res.status(201).json({
      success: 1,
      message: "URL shortened successfully.",
      data: newUrl,
    });
  } catch (error) {
    console.error("Error in createShortUrl:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: 0,
        message: error.message,
      });
    }

    // Generic internal server error handling
    res.status(500);
    return next(new Error("Internal Server Error"));
  }
};

const getAllUrls = async (req, res, next) => {
  try {
    const urls = await Url.find();

    res.status(200).json({
      success: 1,
      message: "Request Successfull",
      data: urls,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    return next(new Error("Internal Server Error"));
  }
};

const getUrlByShortUrl = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    if (!shortUrl) {
      res.status(400);
      return next(new Error("shortUrl is a required field"));
    }

    const url = await Url.findOne({ shortUrl });

    if (!url) {
      res.status(404);
      return next(new Error("URL not found"));
    }

    return res.status(200).json({
      success: 1,
      message: "Request successful",
      data: url,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    return next(new Error("Internal Server Error"));
  }
};

const redirectUrl = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    console.log("shortUrl", shortUrl);
    if (!shortUrl) {
      res.status(400);
      return next(new Error("shortUrl is a required field"));
    }

    const url = await Url.findOne({ shortUrl }).exec();
    console.log("url", url);
    if (!url) {
      res.status(400);
      return next(new Error("URL not found"));
    }

    res.status(301).redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500);
    return next(new Error("Internal Server Error"));
  }
};

const updateUrl = async (req, res, next) => {
  const { shortUrl } = req.params;
  const { originalUrl } = req.body;

  if (!shortUrl || !originalUrl) {
    res.status(400);
    return next(
      new Error(
        "shortUrl in route params and originalUrl in request body is required"
      )
    );
  }

  try {
    const url = await Url.findOneAndUpdate(
      { shortUrl },
      { originalUrl },
      { new: true }
    );

    if (!url) {
      res.status(400);
      return next(new Error("URL not found for update"));
    }

    res.status(200).json({
      success: 1,
      message: "URL updated successfully",
      data: url,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    return next(new Error("Internal Server Error"));
  }
};

const deleteUrl = async (req, res, next) => {
  const { shortUrl } = req.params;

  if (!shortUrl) {
    res.status(400);
    return next(new Error("shortUrl is required"));
  }
  try {
    const deletedUrl = await Url.findOneAndDelete({ shortUrl });

    if (!deletedUrl) {
      res.status(400);
      return next(new Error("URL not found to delete"));
    }

    res.status(200).json({
      success: 1,
      message: "URL deleted successfully",
      data: deletedUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    return next(new Error("Internal Server Error"));
  }
};

export {
  createShortUrl,
  getAllUrls,
  getUrlByShortUrl,
  redirectUrl,
  updateUrl,
  deleteUrl,
};
