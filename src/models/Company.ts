import mongoose, { Schema, Types } from 'mongoose';

export type CompanyDocument = Document & {
    name: string
    owner?: Types.ObjectId
    shops: Types.ObjectId[]
}

const companySchema = new mongoose.Schema<CompanyDocument>(
    {
        name: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        shops: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],
    },
    {
        timestamps: true
    }
);

export default mongoose.model<CompanyDocument>('Company', companySchema);
