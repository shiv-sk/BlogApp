import express from "express";
const router = express.Router();
import {addComment , getAllCommentsOfBlog} from "../controllers/comment.controller"
router.route("/new").post(addComment);
router.route("/").get(getAllCommentsOfBlog);
export default router;