// app/api/notes/route.ts

import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Note, { INote } from "@/models/Note";

// GET handler to fetch all notes
export async function GET() {
    try {
        await connectMongo(); // Connect to MongoDB
        const notes = await Note.find({}).sort({ createdAt: -1 });

        return NextResponse.json(notes, { status: 200 });
    } catch (error) {
        console.error("MongoDB GET Error:", error);
        return NextResponse.json(
            { message: "Failed to fetch notes." },
            { status: 500 }
        );
    }
}

// POST handler to create a new note
export async function POST(request: Request) {
    try {
        await connectMongo(); // Connect to MongoDB
        const body = await request.json();
        const { title, content } = body as INote;

        if (!title || !content) {
            return NextResponse.json(
                { message: "Missing required fields." },
                { status: 400 }
            );
        }

        const newNote = await Note.create({ title, content });

        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        console.error("MongoDB POST Error:", error);
        return NextResponse.json(
            { message: "Failed to create note." },
            { status: 500 }
        );
    }
}