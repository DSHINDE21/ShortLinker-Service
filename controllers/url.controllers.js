import { Error } from "mongoose";
import Url from "../models/Url.model.js";

const createShortUrl = async (req, res, next) => {
  console.log("reached here...");
  try {
    const { originalUrl } = req.body;
    // Todo: Simple logic is used as of now, later made special logic
    const shortUrl = Math.random().toString(16).substring(2, 6);

    if (!originalUrl) {
      res.status(400);
      return next(new Error("originalUrl is a required field"));
    }

    //check if url already exists
    const isUrlExists = await Url.findOne();
    if (isUrlExists) {
      res.status(400);
      return next(new Error("originalUrl already shortenedd"));
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
