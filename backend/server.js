import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Register
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: { name, email } });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// ✅ Login
app.post("/api/login", async (req, res) => {
    try {
        console.log("Login hit with data:", req.body);

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log("User found:", user);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// ✅ Test route
app.get("/", (req, res) => {
    res.send("API is working 🚀");
});

// ✅ Start server after DB connect
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("MongoDB error ❌", err));
