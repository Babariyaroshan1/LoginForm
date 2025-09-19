const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected ✅"))
    .catch(err => console.log("MongoDB error ❌", err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    photo: String
});

const User = mongoose.model("User", userSchema);

// Register
app.post("/api/register", async (req, res) => {
    const { name, email, password, photo } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, photo });
        await newUser.save();

        res.status(200).json({ message: "User registered successfully", user: { name, email, photo } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Login
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email, photo: user.photo } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Update Profile
app.put("/api/update-profile/:email", async (req, res) => {
    const { email } = req.params;
    const { name, email: newEmail, photo } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (name) user.name = name;
        if (newEmail) user.email = newEmail;
        if (photo) user.photo = photo;

        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Update Password
app.put("/api/update-password/:email", async (req, res) => {
    const { email } = req.params;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
