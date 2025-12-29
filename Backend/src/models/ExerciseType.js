import mongoose from "mongoose";

const exerciseTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Chest, Legs, Cardio
    slug: { type: String, unique: true },
    icon: { type: String, required: true },
  },
  { timestamps: true }
);

// Auto-generate slug before saving
exerciseTypeSchema.pre("save", function (next) {
  this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  next();
});

export default mongoose.model("ExerciseType", exerciseTypeSchema);
