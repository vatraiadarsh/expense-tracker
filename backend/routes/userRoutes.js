import express from "express";
const router = express.Router();

import { registerUser, loginUser,getUsers } from "../controllers/userController.js";
import { protect, Admin } from "../middleware/authMiddleware.js";


router.route("/").post(registerUser).get(protect,getUsers);
router.route("/login").post(loginUser);
export default router;
