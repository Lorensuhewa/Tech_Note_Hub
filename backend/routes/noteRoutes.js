import express from "express";

import {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

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