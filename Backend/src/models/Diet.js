import mongoose from "mongoose";

const dietSchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    exerciseType: { type: mongoose.Schema.Types.ObjectId, ref: "ExerciseType", required: true },
    breakfast: { type: String },
    lunch: { type: String },
    dinner: { type: String },
    snacks: { type: String },
    caloriesTotal: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Diet", dietSchema);
