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

  const inactiveStatus = await User.findOne({ status: "inactive", email });
  if (inactiveStatus) {
    res.status(401);
    throw new Error("Your account is inactive/suspended please contact admin");
  }
  const user = await User.findOne({ status: "active", email });
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

export const updateUserStatus = asyncHandler(async (req, res) => {
  const { _id, status } = req.body;
  await User.findByIdAndUpdate({ _id }, { status });
  res.status(203).send("User Updated");
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not found");
  }
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.user.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      status: updatedUser.status,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not found");
  }
});
