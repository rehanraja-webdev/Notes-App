import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Username is required"],
      trim: true, //Keeps space between words but remove all other whitespaces and newlines
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minlength: [3, "Username must be atleast 3 characters long"],
      trim: true, //Keeps space between words but remove all other whitespaces and newlines
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "password must be atleast 8 characters long"],
    },
    dob: {
      type: Date,
      validate: {
        validator: (value) => value < new Date(),
        message: "Date must be from the past",
      },
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
