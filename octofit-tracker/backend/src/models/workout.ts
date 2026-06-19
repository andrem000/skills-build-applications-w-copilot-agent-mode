import { Schema, model, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  durationMinutes: number;
  focus: string;
  suggestedCalories: number;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, required: true },
  suggestedCalories: { type: Number, required: true }
});

export default model<IWorkout>('Workout', workoutSchema);
