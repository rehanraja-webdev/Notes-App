import Note from "../models/note.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const getUserNotes = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const notes = await Note.find({ user: decoded.id })
      .populate("user", "fullname username email")
      .sort({ updatedAt: -1 });

    if (notes.length === 0) {
      return res.status(200).json({
        message: "No notes available!",
      });
    }

    res.status(200).json({
      message: "Notes fetched successfully!!",
      notes,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching notes!",
      error,
    });
  }
};

const createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Please Login or Sign Up to create notes!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const note = await Note.create({
      title,
      content,
      user: decoded.id,
    });

    await note.populate("user", "fullname username email");

    res.status(201).json({
      message: "Note created successfully!",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create note!",
      error: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found!",
      });
    }

    if (note.user.toString() !== decoded.id) {
      return res.status(403).json({
        message: "You can only delete your own notes!",
      });
    }

    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in deleting note", error: error.message });
  }
};

const updateNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found!",
      });
    }

    if (note.user.toString() !== decoded.id) {
      return res.status(403).json({
        message: "You can only update your own notes!",
      });
    }

    const normalize = (str) => str.trim().replace(/\s+/g, " ");

    const simpleTitle = normalize(title);
    const simpleContent = normalize(content);

    if (
      normalize(note.title) === simpleTitle &&
      normalize(note.content) === simpleContent
    ) {
      return res.status(200).json({
        message: "No changes found!",
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title: simpleTitle, content: simpleContent },
      { new: true },
    );

    res
      .status(200)
      .json({ message: "Note updated successfully!", note: updatedNote });
  } catch (error) {
    res.status(500).json({
      message: "Error in updating note!",
      error: error.message,
    });
  }
};

export default { getUserNotes, createNote, deleteNote, updateNote };
