require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const User = require("./models/user.model");
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.json({ data: "hello"});
});

//Create Account
app.post("/create-account", async (req, res) => {

    const { fullName, email, password } = req.body;

    if(!fullName) {
        return res
         .status(400)
         .json({ error: true, message: "Full Name is required" });
    }

    if(!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }

    if(!password) {
        return res
         .status(400)
         .json({ error: true, message: "Password is required" });
    }

    const isUser = await User.findOne({ email: email });

    if(isUser) {
        return res.json({
            error: true,
            message: "User already exists",
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });
    
    return res.json({
        error: false, 
        user,
        accessToken,
        message: "Account created successfully",
    });
});

//Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if(!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    if(!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const userInfo = await User.findOne({ email: email });

    if(!userInfo) {
        return res.status(400).json({ message: "User not found" });
    }

    if(userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error: false,
            message: "Login Successful",
            user: userInfo,
            accessToken,
        });
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials",
        });
    }
});

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;

    const isUser = await User.findOne({ _id: user._id });

    if(!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: { 
            fullName: isUser.fullName,
            email: isUser.email, 
            "_id": isUser._id, 
            createdOn: isUser.createdOn,
        },
        message: "",
    });
});

//Add Notes
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if(!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }

    if(!content) {
        return res
         .status(400)
         .json({ error: true, message: "Content is required" });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

//Edit Notes
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if(!title && !content && !tags) {
        return res
         .status(400)
         .json({ error: true, message: "No changes provided"})
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if(!note) {
            return res
             .status(400)
             .json({ error: true, message: "Note not found" });
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated succesfully",
        });
    } catch(error) {
        return res
         .status(500)
         .json({ error: true, message: "Internal Server Error" });
    }
});

//Get All Notes
app.get("/get-all-notes/", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id
        }).sort({ isPinned: -1
        });
        return res.json({
            error: false,
            notes,
            message: "All notes retrieved succesfully",
        });
    } catch(error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        })
    }
});

//Delete Notes
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id })
         
        if(!note) {
            return res
             .status(404)
             .json({ error: true, message: "Note not found" });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({
            error: false,
            message: "Note delete succesfully",
        });
    } catch(error) {
        return res
         .status(500)
         .json({ error: true, message: "Internal Server Error" });
    }
});

// Update isPinned Value
app.put('/update-note-pinned/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    const { isPinned } = req.body;
    
    console.log('Updating note:', { noteId, newPinStatus: isPinned });

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { isPinned },
      { new: true } // This ensures you get the updated document back
    );

    console.log('Note after update:', updatedNote);

    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.json({ note: updatedNote });
  } catch (error) {
    console.error('Error in update-note-pinned:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Serch Notes
app.get("/search-notes/", authenticateToken, async (req,res) => {
    const { user } = req.user;
    const { query } = req.query;

    if(!query) {
        return res
         .status(400)
         .json({ error: true, message: "Search query is required" });
    }

    try {
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } }, 
            ],
        });

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrieved succesfully",
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "InternalServer Error",
        })
    }
 })  

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;