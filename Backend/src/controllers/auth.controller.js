import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Register = async (req, res) => {
  const { fullname, username, email, password, gender, dob } = req.body;

  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    return res.status(409).json({
      success: false,
      message: "User already exits with given details!!",
    });
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
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    console.log("Failed to register user!", error);
  }
};

const Login = async (req, res) => {
  const { username, email, password } = req.body;

  //check if user exists with given details ( username, email because they are unique)
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials!",
    });
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

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
  });
};

const Logout = (req, res) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User is not logged in",
    });
  }

  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};

const getUser = async (req, res) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({ message: "No user found" });
    }
    res.status(200).json({ message: "User found!", user });
  } catch (error) {
    console.log("Error in finding user", error.message);
  }
};

export default { Register, Login, Logout, getUser };
