import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from "@/lib/mongodb";
import Note from "@/models/Note";
import { FilterQuery } from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // Request logging (Task 2 requirement)
  console.log(`[Request] ${req.method} ${req.url}`);

  await dbConnect();
  console.log("[Notes] Connected to database");

  try {

    if (req.method === "GET") {
      console.log("[Notes][GET] Fetching notes");

      const includeDeleted = req.query.includeDeleted === "true";
      const userId = req.query.userId as string;

      if (!userId) {
        console.warn("[Notes][GET] Missing userId");
        return res.status(400).json({ message: "User not logged in" });
      }

      const baseQuery = {
        $or: [
          { userId },
          { sharedWith: userId }
        ]
      };

      let finalQuery: FilterQuery<typeof Note> = baseQuery;

      if (!includeDeleted) {
        finalQuery = {
          $and: [
            baseQuery,
            {
              $or: [
                { isDeleted: false },
                { isDeleted: { $exists: false } }
              ]
            }
          ]
        };
      }

      const notes = await Note.find(finalQuery).sort({ createdAt: -1 });

      return res.status(200).json(notes);
    }

    if (req.method === "POST") {
      console.log("[Notes][POST] Creating note");

      const { title, content, userId } = req.body;

      if (!title) {
        console.warn("[Notes][POST] Missing title");
        return res.status(400).json({ message: "Title is required" });
      }

      if (!userId) {
        console.warn("[Notes][POST] Missing userId");
        return res.status(400).json({ message: "User not logged in" });
      }

      const newNote = await Note.create({
        title,
        content,
        userId,
        isDeleted: false
      });

      console.log("[Notes] Note created successfully");

      return res.status(201).json(newNote);
    }

    console.warn("[Notes] Method not allowed:", req.method);
    return res.status(405).json({ message: "Method not allowed" });

  } catch (err) {

    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(500).json({ message: "Unknown error" });
  }
}