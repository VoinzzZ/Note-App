const Note = require("../models/note.model");

const addNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.user.id;

    // Validasi userId sebelum membuat note
    if (!userId) {
      console.error("userId is undefined. req.user:", req.user);
      return res.status(401).json({ 
        error: true, 
        message: "User authentication failed. UserId not found." 
      });
    }

    if (!title) return res.status(400).json({ error: true, message: "Title is required" });
    if (!content) return res.status(400).json({ error: true, message: "Content is required" });

    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: userId.toString(),
    });

    await note.save();

    return res.json({ error: false, note, message: "Note added successfully" });
  } catch (error) {
    console.error("Error in addNote:", error);
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      console.error("Validation Error Details:", error.errors);
    }
    
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// ===================== EDIT NOTE =====================
const editNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const userId = req.user.id;

    if (!title && !content && !tags && typeof isPinned === "undefined") {
      return res.status(400).json({ error: true, message: "No changes provided" });
    }

    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (typeof isPinned !== "undefined") note.isPinned = isPinned;

    await note.save();

    return res.json({ error: false, note, message: "Note updated successfully" });
  } catch (error) {
    console.error("Error in editNote:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// ===================== GET ALL NOTES =====================
const getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await Note.find({ userId }).sort({ isPinned: -1 });

    return res.json({ error: false, notes, message: "All notes retrieved successfully" });
  } catch (error) {
    console.error("Error in getAllNotes:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// ===================== DELETE NOTE =====================
const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.user.id;

    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    await Note.deleteOne({ _id: noteId, userId });

    return res.json({ error: false, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// ===================== UPDATE PINNED =====================
const updatePinned = async (req, res) => {
  try {
    const noteId = req.params.id; // Sesuai dengan route :id
    const { isPinned } = req.body;
    const userId = req.user.id; // Sesuai dengan JWT payload

    // Debug log
    console.log('updatePinned - noteId:', noteId);
    console.log('updatePinned - userId:', userId);
    console.log('updatePinned - isPinned:', isPinned);

    // Validasi input
    if (!noteId) {
      return res.status(400).json({ error: true, message: "Note ID is required" });
    }

    if (typeof isPinned !== 'boolean') {
      return res.status(400).json({ error: true, message: "isPinned must be a boolean" });
    }

    // Cari dan update note
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId: userId }, // Pastikan note milik user yang benar
      { isPinned },
      { new: true }
    );

    console.log('Found note:', note); // Debug log

    if (!note) {
      // Cek apakah note ada tapi bukan milik user ini
      const noteExists = await Note.findById(noteId);
      if (noteExists) {
        return res.status(403).json({ error: true, message: "Access denied. Note belongs to another user." });
      }
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    return res.json({ error: false, note, message: "Note pin status updated" });
  } catch (error) {
    console.error("Error in updatePinned:", error);
    
    // Handle invalid ObjectId error
    if (error.name === 'CastError') {
      return res.status(400).json({ error: true, message: "Invalid note ID format" });
    }
    
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// ===================== SEARCH NOTES =====================
const searchNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const { query } = req.query;

    if (!query) return res.status(400).json({ error: true, message: "Search query is required" });

    const notes = await Note.find({
      userId,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    return res.json({ error: false, notes, message: "Search results retrieved successfully" });
  } catch (error) {
    console.error("Error in searchNotes:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = {
  addNote,
  editNote,
  getAllNotes,
  deleteNote,
  updatePinned,
  searchNotes,
};
