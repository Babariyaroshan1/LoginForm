import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/User.js";

dotenv.config();
const app = express();

// Serve uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/image", express.static(path.join(__dirname, "image")));

// CORS Middleware
app.use(
    cors({
        origin: [
            "http://localhost:5173",   // local React app
            "https://loginform-lqc0.onrender.com" // deployed frontend URL
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Handle preflight
app.options("*", cors());
app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));

// -----------------------------
// Multer setup for profile photo
// -----------------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "image/"),
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });

// -----------------------------
// API: Upload profile photo
// -----------------------------
app.post("/api/upload/:email", upload.single("photo"), async (req, res) => {
    try {
        const email = req.params.email;
        const imagePath = `/image/${req.file.filename}`;

        // Update profilePhoto field in User model
        const user = await User.findOneAndUpdate(
            { email },
            { profilePhoto: imagePath },
            { new: true, upsert: true }
        );

        res.json(user);
    } catch (err) {
        console.error("Photo upload error:", err);
        res.status(500).json({ error: err.message });
    }
});

// Register
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password, photo } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword, profilePhoto: photo });
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser._id, name, email, profilePhoto: newUser.profilePhoto },
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
                profilePhoto: user.profilePhoto || "",
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Update Profile
app.put("/api/update-profile/:email", async (req, res) => {
    const { email } = req.params;
    const { name, newEmail, photo } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (name) user.name = name;
        if (newEmail) user.email = newEmail;
        if (photo) user.profilePhoto = photo;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePhoto: user.profilePhoto,
            },
        });
    } catch (err) {
        console.error("Update profile error:", err);
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
        if (!isMatch)
            return res.status(400).json({ message: "Old password is incorrect" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.error("Update password error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Test Endpoint
app.get("/", (req, res) => res.send("API is working"));

// Start Server
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    )
    .catch((err) => console.error("MongoDB connection error:", err));
