import express from "express";

import {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
} from "../controllers/noteController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// all note routes require authentication
router.use(protect);

// POST /api/notes
router.post("/", createNote);

// GET /api/notes
router.get("/", getNotes);

// GET /api/notes/:id
router.get("/:id", getNoteById);

// PUT /api/notes/:id
router.put("/:id", updateNote);

// DELETE /api/notes/:id
router.delete("/:id", deleteNote);

export default router;