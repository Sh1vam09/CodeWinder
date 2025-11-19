// models/Note.ts

import { Schema, model, models } from "mongoose";

export interface INote {
    title: string;
    content: string;
    createdAt: Date;
}

const NoteSchema = new Schema<INote>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Avoids recompiling the model every time
const Note = models.Note || model<INote>("Note", NoteSchema);

export default Note;