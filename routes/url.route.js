import express from "express";
import { createShortUrl } from "../controllers/url.controllers.js";

const router = express.Router();

router.post("/create", createShortUrl);

export default router;
