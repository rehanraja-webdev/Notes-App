import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

const Register = asyncHandler(async (req, res) => {
  const { fullname, username, email, password, gender, dob } = req.body;

  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    throw new ApiError(409, "User already exists!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullname,
    username,
    email,
    password: hashedPassword,
    gender,
    dob,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  const createdUser = await User.findById(user._id).select("-password");

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: createdUser,
  });
});

const Login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials!");
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  const loggedInUser = await User.findById(user._id).select("-password");

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: loggedInUser,
  });
});

const Logout = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    throw new ApiError(403, "Unable to logged out!");
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({ message: "User logged out successfully!" });
});

const getUser = async (req, res) => {
  const currentUser = await User.findById(req.user._id).select("-password");
  res.status(200).json(new ApiResponse(200, "User data fetched!", currentUser));
};

export default { Register, Login, Logout, getUser };
