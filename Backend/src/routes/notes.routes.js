import express from "express";
import notesController from "../controllers/notes.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, notesController.createNote);

router.get("/get", authMiddleware, notesController.getUserNotes);

router.delete("/delete/:id", authMiddleware, notesController.deleteNote);
router.patch("/update/:id", authMiddleware, notesController.updateNote);

export default router;
