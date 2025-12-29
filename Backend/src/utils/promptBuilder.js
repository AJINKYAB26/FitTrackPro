export const buildDietPrompt = ({ fitnessLevel, goal, dietType }) => {
  return `
Create a professional daily diet plan.

User details:
- Fitness Level: ${fitnessLevel}
- Goal: ${goal}
- Diet Type: ${dietType}

Rules:
- 5 meals
- Include calories, protein, carbs, fat
- Include water intake
- Return STRICT JSON

JSON format:
{
  "totalCalories": number,
  "waterIntake": number,
  "meals": [
    {
      "name": "",
      "time": "",
      "foods": [],
      "calories": number,
      "protein": number,
      "carbs": number,
      "fat": number
    }
  ]
}
`;
};
