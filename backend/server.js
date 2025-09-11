import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import User from "./models/User.js";

dotenv.config();
const app = express();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if not exists
import fs from 'fs';
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Simple Multer configuration - without diskStorage
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Body parser
app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File too large. Max 5MB allowed.' });
        }
    }
    next(error);
});

// Register (with profile photo)
app.post("/api/register", upload.single('profilePhoto'), async (req, res) => {
    try {
        console.log("Register request received:", req.body);
        console.log("File received:", req.file);

        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword,
            profilePhoto: req.file ? `/uploads/${req.file.filename}` : null
        });
        
        await newUser.save();

        res.status(201).json({ 
            message: "User registered successfully", 
            user: { 
                name, 
                email,
                profilePhoto: newUser.profilePhoto
            } 
        });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Login
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePhoto: user.profilePhoto
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Update Profile (name and photo) - SIMPLIFIED VERSION
app.put("/api/update-profile/:email", upload.single('profilePhoto'), async (req, res) => {
    try {
        console.log("Update profile request received");
        console.log("Body:", req.body);
        console.log("File:", req.file);
        console.log("Params:", req.params);

        const { email } = req.params;
        const { name } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (name) user.name = name;
        
        // Update profile photo if uploaded
        if (req.file) {
            user.profilePhoto = `/uploads/${req.file.filename}`;
        }
        
        await user.save();

        res.json({
            message: "Profile updated successfully",
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                profilePhoto: user.profilePhoto
            }
        });
    } catch (err) {
        console.error("Update profile error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Get user profile
app.get("/api/user/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email }).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ user });
    } catch (err) {
        console.error("Get user error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Update Password
app.put("/api/update-password/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const { oldPassword, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.error("Update password error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Test endpoint with file upload test
app.get("/test-upload", (req, res) => {
    res.json({ message: "Upload endpoint is working" });
});

// Test
app.get("/", (req, res) => {
    res.send("API is working");
});

// Start Server
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => console.error("MongoDB connection error:", err));