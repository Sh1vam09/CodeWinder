// app/notes/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Note {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. Fetch Notes (Uses the new MongoDB API)
    const fetchNotes = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/notes");
            if (res.ok) {
                const data = await res.json();
                setNotes(data);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    // 2. Submit New Note (Uses the new MongoDB API)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            });

            if (res.ok) {
                // Clear form and refetch notes to show the new one
                setTitle("");
                setContent("");
                await fetchNotes();
            } else {
                console.error("Failed to create note");
            }
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold">MongoDB Notes Feature</h1>
            <p className="text-sm text-gray-500">
                This section uses a separate MongoDB database, while the rest of your app
                uses the existing database via Prisma.
            </p>

            {/* Note Creation Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Create a New Note</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            placeholder="Note Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <Textarea
                            placeholder="Note Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Note"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Display Existing Notes */}
            <h2 className="text-2xl font-semibold mt-8">Recent Notes</h2>
            {loading ? (
                <p>Loading notes from MongoDB...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note) => (
                        <Card key={note._id}>
                            <CardHeader>
                                <CardTitle>{note.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">{note.content}</p>
                                <p className="text-xs text-gray-400 mt-2">
                                    Created: {new Date(note.createdAt).toLocaleDateString()}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}