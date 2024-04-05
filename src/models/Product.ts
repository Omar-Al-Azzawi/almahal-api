import mongoose, { Document, Schema } from 'mongoose';

export type ProductDocument = Document & {
  name: string;
  description: string;
  type: string
  quantity: number
  length: number
  manufacture: string
  price: number;
  owner: Schema.Types.ObjectId
}

const productSchema = new Schema<ProductDocument>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  type: { type: String, required: true},
  quantity: { type: Number, required: true},
  length: { type: Number, required: true},
  manufacture: { type: String, required: true},
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model<ProductDocument>('Product', productSchema);
