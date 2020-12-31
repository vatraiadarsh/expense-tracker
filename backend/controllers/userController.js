import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

/**
 @desc Register a new User
 @route GET /api/users
 @access public
 */

 export const registerUser = asyncHandler(async(req,res) => {
    res.send("<p>registerUser<p>")
 });