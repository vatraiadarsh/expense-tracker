import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
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
      status: user.status,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invaid User data");
  }
});

/**
 @desc Register a new User & get token
 @route POST /api/users/login
 @access public
 */

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(201).json(users);
});
