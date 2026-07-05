import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const getUser = async (req, res) => {
  try {
    const token = req.cookies.token;
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

export default getUser;
