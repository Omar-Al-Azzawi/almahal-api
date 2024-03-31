import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  username: string,
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<User>('User', userSchema);