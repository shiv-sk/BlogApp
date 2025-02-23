import express from "express";
import {likeAndUnlike} from "../controllers/like.controller"
const router = express.Router();
router.route("/").post(likeAndUnlike);
export default router;