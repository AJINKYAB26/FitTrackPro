import ExerciseType from "../models/ExerciseType.js";

export const createExerciseType = async (req, res) => {
  try {
    const { name, icon } = req.body;

    const exists = await ExerciseType.findOne({ name });
    if (exists) return res.status(400).json({ message: "Type already exists" });

    const type = await ExerciseType.create({ name, icon });

    res.status(201).json({ message: "Type created", type });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExerciseType = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const { id } = req.params;

    const type = await ExerciseType.findByIdAndUpdate(
      id,
      { name, icon },
      { new: true }
    );

    if (!type) return res.status(404).json({ message: "Exercise type not found" });

    res.status(200).json({ message: "Type updated", type });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Exercise Type
export const deleteExerciseType = async (req, res) => {
  try {
    const { id } = req.params;

    const type = await ExerciseType.findByIdAndDelete(id);
    if (!type) return res.status(404).json({ message: "Exercise type not found" });

    res.status(200).json({ message: "Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getExerciseTypes = async (req, res) => {
  try {
    const types = await ExerciseType.find();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
