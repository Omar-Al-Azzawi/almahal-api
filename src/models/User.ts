import mongoose, { Schema } from 'mongoose';

import { ProductDocument } from './Product'

export type UserDocument = Document &  {
  username: string,
  email: string;
  password: string;
  products: ProductDocument[];
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        username: { type: String, minlength: 4 , required: true },
        email: { type: String, required: true },
        password: { type: String, minlength: 8, required: true },
        products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<UserDocument>('User', userSchema);