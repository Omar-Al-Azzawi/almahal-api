import mongoose, { Document, Schema } from 'mongoose';

import { UserDocument } from './User';
import { ShopDocument } from './Shop';

export type ProductDocument = Document & {
  name: string;
  description: string;
  type: string
  quantity: number
  length: number
  manufacture: string
  price: number;
  createdBy: UserDocument
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
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ProductDocument>('Product', productSchema);
