// src/types/fitness.jsx

// ============================
// Fitness Levels
// ============================
export const FITNESS_LEVELS = ['beginner', 'intermediate', 'advanced'];

// ============================
// Exercise Categories
// ============================
export const EXERCISE_CATEGORIES = [
  'cardio',
  'legs',
  'chest',
  'shoulder',
  'back',
  'biceps',
  'triceps',
  'abs',
  'fullbody',
  'hiit',
  'stretching',
];

// ============================
// Goals
// ============================
export const GOALS = ['bulking', 'cutting', 'strength', 'maintenance'];

export const Meal = {
  name: '',
  time: '',
  foods: '[]',
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
}

// ============================
// Default User Profile (optional helper)
// ============================
export const DEFAULT_USER_PROFILE = {
  id: '',
  name: '',
  email: '',
  age: 0,
  weight: 0,
  height: 0,
  fitnessLevel: 'beginner',
  goal: 'maintenance',
};

// ============================
// Helper: Create Exercise Object
// (Optional but useful for Admin Dashboard)
// ============================
export const createExercise = ({
  id,
  name,
  category,
  targetMuscle,
  sets,
  reps,
  metValue,
  description,
  difficulty,
  caloriesPerMinute,
  videoUrl,
  imageUrl,
}) => ({
  id,
  name,
  category,
  targetMuscle,
  sets,
  reps,
  metValue,
  description,
  difficulty,
  caloriesPerMinute,
  videoUrl: videoUrl || '',
  imageUrl: imageUrl || '',
});

// ============================
// Helper: Create Workout Plan
// ============================
export const createWorkoutPlan = ({
  id,
  date,
  exercises = [],
  totalCalories = 0,
  completed = false,
}) => ({
  id,
  date,
  exercises,
  totalCalories,
  completed,
});

// ============================
// Helper: Create Diet Plan
// ============================
export const createDietPlan = ({
  goal,
  fitnessLevel,
  meals = [],
  totalCalories = 0,
  waterIntake = 0,
}) => ({
  goal,
  fitnessLevel,
  meals,
  totalCalories,
  waterIntake,
});

// ============================
// Helper: Create Daily Stats
// ============================
export const createDailyStats = ({
  date,
  caloriesBurned = 0,
  exercisesCompleted = 0,
  workoutDuration = 0,
  streak = 0,
}) => ({
  date,
  caloriesBurned,
  exercisesCompleted,
  workoutDuration,
  streak,
});
