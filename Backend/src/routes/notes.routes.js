import express from "express";
import notesController from "../controllers/notes.controller.js";

const router = express.Router();

router.post("/create", notesController.createNote);

router.get("/fetch", notesController.getAllNotes);

router.post("/delete/:id", (req, res) => {
  res.json({ message: "notes deleted successfully" });
});
router.post("/update/:id", (req, res) => {
  res.json({ message: "notes updated successfully" });
});

export default router;
