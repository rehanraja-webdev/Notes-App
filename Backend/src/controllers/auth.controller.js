import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const Register = async (req, res) => {
  const { fullname, username, email, password, gender, dob } = req.body;

  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    throw new ApiError(409, "User already exists!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
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
      secure: true,
      sameSite: "lax",
    });

    res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    throw new ApiError(500, "Internal server Error!");
  }
};

const Login = async (req, res) => {
  const { username, email, password } = req.body;

  //check if user exists with given details ( username, email because they are unique)
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User Not Found!");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Unauthorized!!");
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
    secure: true,
    sameSite: "lax",
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
  });
};

const Logout = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    throw new ApiError(403, "Unable to logged out!");
  }

  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully!" });
};

const getUser = async (req, res) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      throw new ApiError(404, "No token found!");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(401, "Please Login/Register to Continue!");
    }
    res.status(200).json(new ApiResponse(200, "User found!", user));
  } catch {
    throw new ApiError(401, "Login Required");
  }
};

export default { Register, Login, Logout, getUser };
