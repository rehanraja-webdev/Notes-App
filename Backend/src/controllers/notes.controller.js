import Note from "../models/note.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

const getUserNotes = asyncHandler(async (req, res) => {
  const user = req.user;

  const notes = await Note.find({ user: user._id })
    .populate("user", "fullname username email")
    .sort({ updatedAt: -1 });

  if (notes.length === 0) {
    return res.status(200).json(new ApiResponse(200, "No Notes Available!"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Notes fetched successfully!!", notes));
});

const createNote = asyncHandler(async (req, res) => {
  const user = req.user;
  const { title, content } = req.body;

  const note = await Note.create({
    title,
    content,
    user: user._id,
  });

  await note.populate("user", "fullname username email");

  res
    .status(201)
    .json(new ApiResponse(201, "Note created successfully!", note));
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    throw new ApiError(404, "No note found!");
  }

  if (note.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You cann't delete others note!");
  }

  await Note.findByIdAndDelete(req.params.id);

  res.status(200).json(new ApiResponse(200, "Note deleted successfully!"));
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.findById(req.params.id);

  if (!note) {
    throw new ApiError(404, "No note found!");
  }

  if (note.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You cann't modify other note!");
  }

  const normalize = (str) => str.trim().replace(/\s+/g, " ");

  const simpleTitle = normalize(title);
  const simpleContent = normalize(content);

  if (
    normalize(note.title) === simpleTitle &&
    normalize(note.content) === simpleContent
  ) {
    throw new ApiError(404, "No change found!");
  }

  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    { title: simpleTitle, content: simpleContent },
    { new: true },
  );

  res.status(200).json(
    new ApiResponse(200, "Note updated successfully!", {
      updatedNote,
    }),
  );
});

export default { getUserNotes, createNote, deleteNote, updateNote };
