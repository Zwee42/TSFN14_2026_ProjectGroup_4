import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { MongoServerError } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    //  Request logging (Task 2 requirement)
    console.log(`[Request] ${req.method} ${req.url}`);

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }

    try {
        await dbConnect();
        console.log("[Register] Connected to database");

        const { username, email, password } = req.body;

        console.log("[Register] Creating user:", { username, email });

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Whoops! Fill in all fields" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        console.log("[Register] User created successfully");

        return res.status(201).json({ message: "All went good!" });

    } catch (err: unknown) {

        
       console.error(err);

            if (err instanceof MongoServerError && err.code === 11000) {
                return res.status(400).json({message: "email or username laready taken"});

            }
                        return res.status(500).json({error: " something went wrong :( "});

        }
}