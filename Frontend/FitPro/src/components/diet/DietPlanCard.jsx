import React from "react";
import { useFitness } from "../context/FitnessContext";
import { getDietPlan } from "../../data/dietplan";
import { Droplets, Flame, Clock } from "lucide-react";

const DietPlanCard = () => {
  const { user, selectedLevel } = useFitness();

  const goal = user?.goal || "maintenance";
  const dietPlan = getDietPlan(goal, selectedLevel);

  const goalLabels = {
    bulking: "🏋️ Bulking Plan",
    cutting: "🔥 Cutting Plan",
    strength: "💪 Strength Plan",
    maintenance: "⚖️ Maintenance Plan",
  };

  return (
    <div className="rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">{goalLabels[goal]}</h3>
          <p className="text-sm text-gray-400 mt-1">
            Personalized nutrition for your goals
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-yellow-300">
            {dietPlan.totalCalories}
          </p>
          <p className="text-xs text-gray-400">daily calories</p>
        </div>
      </div>

      {/* WATER INTAKE */}
      <div className="flex items-center gap-4 p-3 bg-zinc-800/50 rounded-xl mb-6">
        <Droplets className="w-6 h-6 text-yellow-300" />
        <div>
          <p className="font-medium">Daily Water Intake</p>
          <p className="text-sm text-gray-400">{dietPlan.waterIntake} liters</p>
        </div>
      </div>

      {/* MEALS */}
      <div className="space-y-4">
        {dietPlan.meals.map((meal, index) => (
          <div
            key={meal.name}
            className="p-4 bg-zinc-800/50 rounded-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">{meal.time}</span>
              </div>

              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium text-yellow-300">
                  {meal.calories} kcal
                </span>
              </div>
            </div>

            <h4 className="font-semibold mb-2">{meal.name}</h4>

            <div className="flex flex-wrap gap-2 mb-3">
              {meal.foods.map((food) => (
                <span
                  key={food}
                  className="text-xs px-2 py-1 bg-zinc-700/50 rounded-lg"
                >
                  {food}
                </span>
              ))}
            </div>

            <div className="flex gap-4 text-xs text-gray-400">
              <span>Protein: {meal.protein}g</span>
              <span>Carbs: {meal.carbs}g</span>
              <span>Fat: {meal.fat}g</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietPlanCard;
