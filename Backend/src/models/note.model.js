import mongoose, { Schema } from "mongoose";

const noteSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // User: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  { timestamps: true },
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
