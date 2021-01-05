import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization)
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne(
        { _id: { $eq: decoded.id } },
        { password: 0 }
      );
      next();
    } catch (error) {
        console.error(error);
        res.status(401)
        throw new Error("Not authorized, token failed")
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token found");
  }
});

export const Admin = (req,res,next) => {
  if (req.user?.isAdmin) {
    next()
  }else{
    res.status(401)
    throw new Error("Admin resource! Access Denied")
  }
}

