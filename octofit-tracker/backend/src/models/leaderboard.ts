import { Schema, model, Document, Types } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  rank: number;
  team: Types.ObjectId;
  points: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  rank: { type: Number, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  points: { type: Number, required: true },
  updatedAt: { type: Date, required: true, default: () => new Date() }
});

export default model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
