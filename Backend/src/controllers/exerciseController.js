import Exercise from "../models/Exercise.js";
import ExerciseType from "../models/ExerciseType.js";


export const createExercise = async (req, res) => {
  try {
    const {
      name,
      category,
      exerciseType,
      difficulty,
      targetMuscle,
      sets,
      reps,
      caloriesBurn,
      description,
      steps,
      videoUrl,
    } = req.body;

    const imageUrl = req.file ? req.file.path : null;

    const exercise = await Exercise.create({
      name,
      category,
      exerciseType,
      difficulty,
      targetMuscle,
      sets,
      reps,
      caloriesBurn,
      description,
      steps,
      videoUrl,
      imageUrl,
    });

    res.status(201).json({
      message: "Exercise created",
      exercise,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Exercise.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Exercise not found" });

    res.status(200).json({
      message: "Exercise updated",
      exercise: updated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ message: "Exercise deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getExerciseByCategory = async (req, res) => {
  try {
    const list = await Exercise.find({ category: req.params.id });
    res.status(200).json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getExercises = async (req, res) => {
  try {
    const { level, exerciseType } = req.query;

    let filter = {};

    // 1️⃣ find category by slug (beginner / intermediate)
    if (level) {
      const category = await Category.findOne({ slug: level });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      filter.category = category._id;
    }

    // 2️⃣ find exerciseType by slug (legs / chest)
     if (exerciseType) {
      const type = await ExerciseType.findOne({ slug: exerciseType });
      if (!type) {
        return res.status(404).json({ message: "Exercise type not found" });
      }
      filter.exerciseType = type._id;
    }

    // 3️⃣ filter exercises
    const exercises = await Exercise.find(filter)
      .populate("category", "name slug")
      .populate("exerciseType", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};