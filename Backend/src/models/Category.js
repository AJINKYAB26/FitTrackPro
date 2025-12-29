import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Beginner / Intermediate / Advanced
    icon: { type: String, required: true },
    slug: { type: String, unique: true }, // ✅ add this

  },
  { timestamps: true }
);

categorySchema.pre("validate", function (next) {
  if (this.name && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }
  next();
});


export default mongoose.model("Category", categorySchema);
