import mongoose, { Document, Schema, Types } from 'mongoose';

import { UserDocument } from './User';

export type ProductDocument = Document & {
  name: string
  description: string
  type: string
  quantity: number
  length: number
  manufacture: string
  price: number
  notes: Types.ObjectId[]
  createdBy: UserDocument
  visibility: 'public' | 'private';
}

const productSchema = new Schema<ProductDocument>(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        type: { type: String, required: true},
        quantity: { type: Number, required: true},
        length: { type: Number, required: true},
        manufacture: { type: String, required: true},
        notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        visibility: { type: String, enum: ['public', 'private'], default: 'private' }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ProductDocument>('Product', productSchema);
