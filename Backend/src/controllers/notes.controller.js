import Note from "../models/note.model.js";

const getAllNotes = async (req, res) => {
  const note = await Note.find().sort({ _id: -1 });

  try {
    if (note.length === 0) {
      return res.status(200).json({
        message: "No notes available!",
      });
    }

    res.status(200).json({
      message: "Notes fetched successfully!!",
      note,
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
    const note = await Note.create({
      title,
      content,
    });

    res.status(201).json({
      message: "Note created successfully!",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create note!",
      error,
    });
  }
};
export default { getAllNotes, createNote };
