import express from "express";
import {
  createShortUrl,
  getAllUrls,
  getUrlByShortUrl,
  redirectUrl,
  updateUrl,
} from "../controllers/url.controllers.js";

const router = express.Router();

// Create short Url
router.post("/create", createShortUrl);

// GET all urls
router.get("/", getAllUrls);

// GET a specific URL by shortUrl
router.get("/:shortUrl", getUrlByShortUrl);

// Redirect to originalUrl
router.get("/redirect/:shortUrl", redirectUrl);

// Update original Url
router.put("/:shortUrl", updateUrl);

export default router;
