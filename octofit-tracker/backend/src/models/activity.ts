import { Schema, model, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  team: Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true, default: () => new Date() }
});

export default model<IActivity>('Activity', activitySchema);
