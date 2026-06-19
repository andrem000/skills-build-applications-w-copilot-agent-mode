import { Schema, model, Document, Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: Types.ObjectId[];
  score: number;
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  score: { type: Number, default: 0 },
  createdAt: { type: Date, required: true, default: () => new Date() }
});

export default model<ITeam>('Team', teamSchema);
