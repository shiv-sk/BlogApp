import express from "express";
import { createBlog , getBlogs , getBlog , upDateBlog , deleteBlog , getUserBlogs } from "../controllers/blog.controller";
import upload from "../middleware/media.middleware";
const router = express.Router();
router.route("/newblog").post(upload.single("image") ,createBlog);
router.route("/allblogs").get(getBlogs);
router.route("/userblogs/:userId").get(getUserBlogs);
router.route("/:blogId").get(getBlog).patch(upDateBlog).delete(deleteBlog);
export default router;