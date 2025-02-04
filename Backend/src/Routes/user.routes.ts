import express from "express";
import {
  signup,
  signin,
  createcontent,
  deleteContent,
  getsharelink,
  getsharelinkdata,
  getallcontent,
} from "../Controllers/user.controller";
import { authMiddleware } from "../Middlewares/auth.middleware";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router
  .route("/content")
  .post(authMiddleware, createcontent)
  .get(authMiddleware, getallcontent);
router.route("/content/:id").delete(authMiddleware, deleteContent);
router.route("/content/share").post(authMiddleware, getsharelink);
router.route("/brain/:shareLink").get(authMiddleware, getsharelinkdata);

export default router;
