import mongoose, { Schema } from 'mongoose';

export type NoteDocument = Document & {
    type: string
    title: string
    content: string
    owner: Schema.Types.ObjectId
}

const noteSchema = new mongoose.Schema<NoteDocument>(
    {
        type: { type: String, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true
    }
)

export default mongoose.model<NoteDocument>('Note', noteSchema);
