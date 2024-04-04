import mongoose, { Document, Schema } from 'mongoose';

import { UserDocument } from './User'

export type ProductDocument = Document & {
  name: string;
  description: string;
  price: number;
  owner: Schema.Types.ObjectId
}

const productSchema = new Schema<ProductDocument>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model<ProductDocument>('Product', productSchema);
