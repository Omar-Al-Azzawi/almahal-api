import mongoose, { Schema } from 'mongoose';

import { ProductDocument } from './Product'
import { ShopDocument } from './Shop';

export type UserDocument = Document &  {
  userId: string
  username: string
  email: string
  password: string
  products: ProductDocument[]
  shop?: ShopDocument
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        userId: { type: String },
        username: { type: String, minlength: 4 , required: true },
        email: { type: String, required: true },
        password: { type: String, minlength: 8, required: true },
        products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    },
    {
        timestamps: true
    }
);

export default mongoose.model<UserDocument>('User', userSchema);