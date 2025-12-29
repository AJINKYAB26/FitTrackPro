import Diet from "../models/Diet.js";

export const createDiet = async (req, res) => {
  try {
    const { level, meals, calories } = req.body;

    const diet = await Diet.create({
      level,
      meals,
      calories,
    });

    res.status(201).json({ message: "Diet created", diet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDietPlans = async (req, res) => {
  try {
    const list = await Diet.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a diet by ID
export const getDietById = async (req, res) => {
  try {
    const { id } = req.params;

    const diet = await Diet.findById(id);
    if (!diet) return res.status(404).json({ message: "Diet not found" });

    res.status(200).json(diet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
