import mongoose, { Schema } from 'mongoose';

export type CompanyDocument = Document & {
    name: string;
    owner: Schema.Types.ObjectId;
    shops: Schema.Types.ObjectId[];
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
