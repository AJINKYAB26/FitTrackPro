import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    exercises: [
      {
        exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
        sets: Number,
        reps: Number,
        weight: Number,
        caloriesBurned: Number,
      },
    ],
    totalCalories: { type: Number, default: 0 }, // ✅ ADD
  },
  { timestamps: true }
);

export default mongoose.model("Workout", workoutSchema);
