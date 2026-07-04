import express from "express";
import notesController from "../controllers/notes.controller.js";

const router = express.Router();

router.post("/create", notesController.createNote);

router.get("/fetch", notesController.getUserNotes);

router.delete("/delete/:id", notesController.deleteNote);
router.patch("/update/:id", notesController.updateNote);

export default router;
