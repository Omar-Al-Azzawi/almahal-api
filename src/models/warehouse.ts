import mongoose, { Schema } from 'mongoose';

export type WarehouseDocument = Document & {
    name: string
    owner: Schema.Types.ObjectId
    products: Schema.Types.ObjectId[]
}

const warehouseSchema = new mongoose.Schema<WarehouseDocument>(
    {
        name: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    },
    {
        timestamps: true
    }
);

export default mongoose.model<WarehouseDocument>('Warehouse', warehouseSchema);