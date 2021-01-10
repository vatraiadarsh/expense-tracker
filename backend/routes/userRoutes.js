import express from "express";
const router = express.Router();

import { registerUser, loginUser,getUsers, updateUserStatus } from "../controllers/userController.js";
import { protect, Admin } from "../middleware/authMiddleware.js";


router.route("/").post(registerUser).get(protect,getUsers);
router.route("/").put(protect,updateUserStatus);
router.route("/login").post(loginUser);
export default router;
