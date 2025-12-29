import { createDietPlan, GOALS, FITNESS_LEVELS, Meal } from '../types/fitness';

const bulkingMeals= [
  {
    name: 'Breakfast',
    time: '7:00 AM',
    foods: ['4 Whole Eggs', 'Oatmeal with Banana', 'Protein Shake', 'Peanut Butter Toast'],
    calories: 800,
    protein: 45,
    carbs: 80,
    fat: 35,
  },
  {
    name: 'Mid-Morning Snack',
    time: '10:00 AM',
    foods: ['Greek Yogurt', 'Mixed Nuts', 'Fruit'],
    calories: 400,
    protein: 20,
    carbs: 35,
    fat: 20,
  },
  {
    name: 'Lunch',
    time: '1:00 PM',
    foods: ['Grilled Chicken Breast (200g)', 'Brown Rice (1.5 cups)', 'Vegetables', 'Olive Oil'],
    calories: 750,
    protein: 50,
    carbs: 70,
    fat: 25,
  },
  {
    name: 'Pre-Workout',
    time: '4:00 PM',
    foods: ['Banana', 'Rice Cakes', 'Honey'],
    calories: 250,
    protein: 5,
    carbs: 55,
    fat: 2,
  },
  {
    name: 'Post-Workout',
    time: '6:30 PM',
    foods: ['Whey Protein', 'Fast-Digesting Carbs'],
    calories: 350,
    protein: 40,
    carbs: 40,
    fat: 5,
  },
  {
    name: 'Dinner',
    time: '8:00 PM',
    foods: ['Salmon (200g)', 'Sweet Potato', 'Broccoli', 'Avocado'],
    calories: 700,
    protein: 45,
    carbs: 50,
    fat: 35,
  },
];

const cuttingMeals = [
  {
    name: 'Breakfast',
    time: '7:00 AM',
    foods: ['Egg Whites (6)', 'Whole Wheat Toast', 'Avocado (1/4)'],
    calories: 350,
    protein: 30,
    carbs: 25,
    fat: 15,
  },
  {
    name: 'Mid-Morning Snack',
    time: '10:00 AM',
    foods: ['Protein Shake', 'Almonds (10)'],
    calories: 200,
    protein: 25,
    carbs: 5,
    fat: 10,
  },
  {
    name: 'Lunch',
    time: '1:00 PM',
    foods: ['Grilled Chicken Breast (150g)', 'Quinoa (1/2 cup)', 'Mixed Salad', 'Lemon Dressing'],
    calories: 400,
    protein: 40,
    carbs: 30,
    fat: 12,
  },
  {
    name: 'Afternoon Snack',
    time: '4:00 PM',
    foods: ['Greek Yogurt (Non-fat)', 'Berries'],
    calories: 150,
    protein: 15,
    carbs: 18,
    fat: 2,
  },
  {
    name: 'Dinner',
    time: '7:00 PM',
    foods: ['Grilled Fish (150g)', 'Steamed Vegetables', 'Brown Rice (1/2 cup)'],
    calories: 350,
    protein: 35,
    carbs: 25,
    fat: 12,
  },
  {
    name: 'Evening (Optional)',
    time: '9:00 PM',
    foods: ['Casein Protein or Cottage Cheese'],
    calories: 150,
    protein: 25,
    carbs: 5,
    fat: 3,
  },
];

const maintenanceMeals = [
  {
    name: 'Breakfast',
    time: '7:30 AM',
    foods: ['3 Eggs', 'Oatmeal', 'Banana', 'Orange Juice'],
    calories: 550,
    protein: 28,
    carbs: 60,
    fat: 22,
  },
  {
    name: 'Mid-Morning Snack',
    time: '10:30 AM',
    foods: ['Apple', 'Peanut Butter (2 tbsp)'],
    calories: 280,
    protein: 8,
    carbs: 30,
    fat: 16,
  },
  {
    name: 'Lunch',
    time: '1:00 PM',
    foods: ['Turkey Sandwich', 'Mixed Salad', 'Hummus', 'Veggies'],
    calories: 550,
    protein: 35,
    carbs: 50,
    fat: 22,
  },
  {
    name: 'Afternoon Snack',
    time: '4:00 PM',
    foods: ['Protein Bar', 'Fruit'],
    calories: 300,
    protein: 20,
    carbs: 35,
    fat: 10,
  },
  {
    name: 'Dinner',
    time: '7:30 PM',
    foods: ['Grilled Chicken (180g)', 'Rice (1 cup)', 'Vegetables', 'Olive Oil'],
    calories: 600,
    protein: 45,
    carbs: 55,
    fat: 20,
  },
];

const strengthMeals = [
  {
    name: 'Breakfast',
    time: '6:30 AM',
    foods: ['5 Eggs (3 whole, 2 whites)', 'Oatmeal with Berries', 'Milk'],
    calories: 650,
    protein: 42,
    carbs: 55,
    fat: 28,
  },
  {
    name: 'Mid-Morning',
    time: '9:30 AM',
    foods: ['Cottage Cheese', 'Walnuts', 'Honey'],
    calories: 350,
    protein: 25,
    carbs: 20,
    fat: 18,
  },
  {
    name: 'Lunch',
    time: '12:30 PM',
    foods: ['Beef Steak (200g)', 'Baked Potato', 'Green Beans', 'Butter'],
    calories: 800,
    protein: 55,
    carbs: 50,
    fat: 40,
  },
  {
    name: 'Pre-Workout',
    time: '3:30 PM',
    foods: ['Banana', 'Rice Cakes', 'Protein Shake'],
    calories: 400,
    protein: 30,
    carbs: 60,
    fat: 5,
  },
  {
    name: 'Post-Workout',
    time: '6:00 PM',
    foods: ['Whey Protein', 'Dextrose', 'Creatine'],
    calories: 300,
    protein: 40,
    carbs: 35,
    fat: 2,
  },
  {
    name: 'Dinner',
    time: '8:00 PM',
    foods: ['Grilled Salmon', 'Brown Rice', 'Asparagus', 'Olive Oil'],
    calories: 700,
    protein: 45,
    carbs: 55,
    fat: 32,
  },
];

export const getDietPlan = (goal, level) => {
  let meals;
  let totalCalories;
  let waterIntake;

  switch (goal) {
    case "bulking":
      meals = bulkingMeals;
      totalCalories = 3250;
      waterIntake = 4;
      break;

    case "cutting":
      meals = cuttingMeals;
      totalCalories = 1600;
      waterIntake = 3.5;
      break;

    case "strength":
      meals = strengthMeals;
      totalCalories = 3200;
      waterIntake = 4;
      break;

    case "maintenance":
    default:
      meals = maintenanceMeals;
      totalCalories = 2280;
      waterIntake = 3;
      break;
  }

  // Fitness level adjustment
  const levelMultiplier =
    level === "beginner" ? 0.9 : level === "advanced" ? 1.1 : 1;

  return {
    goal,
    fitnessLevel: level,
    meals: meals.map((meal) => ({
      ...meal,
      calories: Math.round(meal.calories * levelMultiplier),
    })),
    totalCalories: Math.round(totalCalories * levelMultiplier),
    waterIntake,
  };
};