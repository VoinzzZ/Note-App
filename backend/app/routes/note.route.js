const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth.middleware");

const {
  addNote,
  editNote,
  getAllNotes,
  deleteNote,
  updatePinned,
  searchNotes,
} = require("../controllers/note.controller");

// CRUD routes
router.post("/add-note", authenticateToken, addNote);
router.put("/edit-note/:noteId", authenticateToken, editNote);
router.get("/get-all-notes", authenticateToken, getAllNotes);
router.delete("/delete-note/:noteId", authenticateToken, deleteNote);

// Extra routes
router.put("/update-note-pinned/:id", authenticateToken, updatePinned);
router.get("/search-notes", authenticateToken, searchNotes);

module.exports = router;
