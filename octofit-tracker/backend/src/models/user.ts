import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'member' | 'coach' | 'admin';
  joinedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'member' },
  joinedAt: { type: Date, required: true, default: () => new Date() }
});

export default model<IUser>('User', userSchema);
