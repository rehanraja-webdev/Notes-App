import Note from "../models/note.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const getUserNotes = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new ApiError(401, "Unauthorized!");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new ApiError(401, "Unauthorized!");
    }

    const notes = await Note.find({ user: decoded.id })
      .populate("user", "fullname username email")
      .sort({ updatedAt: -1 });

    if (notes.length === 0) {
      return res.status(200).json(new ApiResponse(200, "No Notes Available!"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Notes fetched successfully!!", notes));
  } catch (error) {
    throw new ApiError(400, "Error while fetching Notes!");
  }
};

const createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const token = req.cookies.token;

    if (!token) {
      throw new ApiError(401, "Unauthorized!");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new ApiError(401, "Unauthorized!");
    }

    const note = await Note.create({
      title,
      content,
      user: decoded.id,
    });

    await note.populate("user", "fullname username email");

    res
      .status(201)
      .json(new ApiResponse(201, "Note created successfully!", note));
  } catch (error) {
    throw new ApiError(500, "Error in creating your note!");
  }
};

const deleteNote = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new ApiError(401, "Unaothorized!!");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new ApiError(401, "Unauthorized!");
    }
    const note = await Note.findById(req.params.id);

    if (!note) {
      throw new ApiError(404, "No note found!");
    }

    if (note.user.toString() !== decoded.id) {
      throw new ApiError(403, "You cann't delete others note!");
    }

    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json(new ApiResponse(200, "Note deleted successfully!"));
  } catch (error) {
    throw new ApiError(500, "Error in deleting Note!");
  }
};

const updateNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const token = req.cookies.token;

    if (!token) {
      throw new ApiError(401, "Unauthorized!");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new ApiError(401, "Unauthorized!");
    }
    const note = await Note.findById(req.params.id);

    if (!note) {
      throw new ApiError(404, "No note found!");
    }

    if (note.user.toString() !== decoded.id) {
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
        note: updatedNote,
      }),
    );
  } catch (error) {
    throw new ApiError(500, "Error in updating Note!");
  }
};

export default { getUserNotes, createNote, deleteNote, updateNote };
