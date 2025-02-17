import express from "express";
import { createBlog } from "../controllers/blog.controller";
import upload from "../middleware/media.middleware";
const router = express.Router();
router.route("/newblog").post(upload.single("image") ,createBlog);
export default router;