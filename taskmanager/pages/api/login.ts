import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret"; // move to env file



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // --- Request logging ---
    console.log(`[Request] ${req.method} ${req.url}`);

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }

    try {
        // Connect to database
        await dbConnect();
        console.log("Database connected");

        const { email, password } = req.body;
        console.log("Login attempt:", { email });

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        // Create JWT token
        const token = jwt.sign(
            { email: user.email, username: user.username },
            SECRET,
            { expiresIn: "1h" }
        );

        // Set auth cookie
        const cookie = serialize("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600,
            path: "/",
        });

        res.setHeader("Set-Cookie", cookie);

        return res.status(200).json({
            message: "Login successful",
            user: { username: user.username, email: user.email }
        });

    } catch (err) {
        // --- Structured error logging ---
        console.error("[API Login Error]", err);
        return res.status(500).json({ error: "Something went wrong :(" });
    }
}