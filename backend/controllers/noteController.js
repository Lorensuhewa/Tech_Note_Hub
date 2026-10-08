import Note from "../models/Note.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Create a note
export const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.create({
    title,
    content,
    user: req.user._id,
  });

  res.status(201).json(note);
});

// Get all notes
export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({
    user: req.user._id,
  });

  res.status(200).json(notes);
});

// Get one note
export const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!note) {
    res.status(404);

    throw new Error("Note not found");
  }

  res.status(200).json(note);
});

// Update a note
export const updateNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.findByIdAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    { 
      title, 
      content 
    },
    { 
      new: true, 
      runValidators: true 
    },
  );

  if (!note) {
    res.status(404);

    throw new Error("Note not found");
  }

  res.status(200).json(note);
});

// Delete a note
export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOneAndDelete(
    {
      _id: req.params.id,
      user: req.user._id,
    }
  );
  if (!note) {
    res.status(404);

    throw new Error("Note not found");
  }

  res.status(200).json({
    message: "Note deleted successfully",
  });
});
