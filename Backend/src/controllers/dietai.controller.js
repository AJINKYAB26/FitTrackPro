import { generateDietPlanRuleBased } from "../services/diet.service.js";

export const generateDietPlan = async (req, res) => {
  const { level, goal, dietType } = req.body;

  try {
    const dietPlan = generateDietPlanRuleBased({ level, goal, dietType });
    res.status(200).json(dietPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Diet generation failed", error: error.message });
  }
};
