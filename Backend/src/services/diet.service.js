// Rule-based diet generation service

export const generateDietPlanRuleBased = ({ level, goal, dietType }) => {
  // Base calories
  const baseCalories = 1800;
  let calories = baseCalories;

  // Adjust calories based on goal
  switch (goal.toLowerCase()) {
    case "weight loss":
      calories -= 300;
      break;
    case "muscle gain":
      calories += 400;
      break;
    // maintain goal keeps base calories
  }

  // Adjust calories based on fitness level
  switch (level.toLowerCase()) {
    case "beginner":
      calories -= 100;
      break;
    case "advanced":
      calories += 100;
      break;
  }

  // Approximate water intake in liters
  const waterIntake = Math.round((calories / 1000) * 1.5);

  // Define meals
  const meals = [
    {
      name: "Breakfast",
      time: "7:00 AM",
      foods:
        dietType.toLowerCase() === "vegetarian"
          ? ["Oatmeal with Banana", "4 Whole Eggs", "Peanut Butter Toast"]
          : ["Oatmeal with Banana", "Scrambled Eggs", "Turkey Sausage"],
      calories: Math.round(calories * 0.25),
      protein: 25,
      carbs: 45,
      fat: 15,
    },
    {
      name: "Mid-morning Snack",
      time: "10:00 AM",
      foods: ["Greek Yogurt", "Almonds", "Fruit"],
      calories: Math.round(calories * 0.1),
      protein: 10,
      carbs: 15,
      fat: 5,
    },
    {
      name: "Lunch",
      time: "1:00 PM",
      foods:
        dietType.toLowerCase() === "vegetarian"
          ? ["Quinoa Salad", "Paneer Curry", "Mixed Vegetables"]
          : ["Grilled Chicken", "Brown Rice", "Steamed Veggies"],
      calories: Math.round(calories * 0.3),
      protein: 35,
      carbs: 50,
      fat: 10,
    },
    {
      name: "Afternoon Snack",
      time: "4:00 PM",
      foods: ["Protein Shake", "Fruit"],
      calories: Math.round(calories * 0.1),
      protein: 15,
      carbs: 10,
      fat: 5,
    },
    {
      name: "Dinner",
      time: "7:00 PM",
      foods:
        dietType.toLowerCase() === "vegetarian"
          ? ["Lentil Soup", "Brown Rice", "Vegetable Stir Fry"]
          : ["Baked Fish", "Sweet Potato", "Steamed Vegetables"],
      calories: Math.round(calories * 0.25),
      protein: 30,
      carbs: 35,
      fat: 10,
    },
  ];

  return {
    totalCalories: calories,
    waterIntake,
    meals,
  };
};
