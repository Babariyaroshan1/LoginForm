import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import multer from "multer";
import path from "path"; // ✅ path import
import User from "./models/User.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connect (ek hi baar)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Static folder
app.use("/uploads", express.static("uploads"));

// ================== Routes ================== //

// Upload profile photo
app.post("/api/upload/:email", upload.single("photo"), async (req, res) => {
  try {
    const email = req.params.email;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const imagePath = `/uploads/${req.file.filename}`;

    const user = await User.findOneAndUpdate(
      { email },
      { profilePhoto: imagePath },
      { new: true, upsert: true }
    );

    res.json({ message: "Photo uploaded successfully", user });
  } catch (err) {
    console.error("Photo upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get user by email
app.get("/api/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, photo } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

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

// ✅ Fix: Update Password (typo tha)
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

// Test endpoint
app.get("/", (req, res) => res.send("API is working"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
