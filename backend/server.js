import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// -----------------------------
// Routes
// -----------------------------

// Register
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: { name, email } });
    } catch (err) {
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
            user: { id: user._id, name: user.name, email: user.email, photo: user.photo || "" },
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Update Profile (name & photo)
app.put("/api/update-profile/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const { name, photo } = req.body;

        const user = await User.findOneAndUpdate(
            { email },
            { name, photo },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "Profile updated successfully", user });
    } catch (err) {
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
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Test
app.get("/", (req, res) => {
    res.send("API is working");
});

// -----------------------------
// Start Server
// -----------------------------
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("MongoDB connection error:", err));
