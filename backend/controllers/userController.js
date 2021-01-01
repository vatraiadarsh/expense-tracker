import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

/**
   @desc Register a new User
   @route POST /api/users
   @access public
   */

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404);
    throw new Error("User with that email already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      status:user.status,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invaid User data");
  }
});
