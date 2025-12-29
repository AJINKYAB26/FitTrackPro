import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    exerciseType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExerciseType",
      required: true,
    },

    targetMuscle: { type: String },

    sets: { type: Number },
    reps: { type: String }, // "8-12"

    caloriesBurn: { type: Number },

    description: { type: String },
    steps: [{ type: String }],

    videoUrl: { type: String },

    imageUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Exercise", exerciseSchema);
