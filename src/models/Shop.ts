import mongoose, { Schema } from 'mongoose';

export type ShopDocument = Document & {
    name: string;
    owner: Schema.Types.ObjectId;
    products: Schema.Types.ObjectId[];
}

const shopSchema = new mongoose.Schema<ShopDocument>(
    {
        name: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ShopDocument>('Shop', shopSchema);
