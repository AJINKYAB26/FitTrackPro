import React from "react";
import { useFitness } from "../context/FitnessContext";

export const CategorySelector = () => {
  const {
    exerciseTypes,
    selectedExerciseType,
    setSelectedExerciseType,
  } = useFitness();

  if (!exerciseTypes || exerciseTypes.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6 text-gray-400">
        Loading exercise categories...
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-xl font-bold font-display text-foreground mb-4">
        Exercise Categories
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {exerciseTypes.map((type, index) => {
          // ✅ FIX 1: compare by _id
          const isSelected = selectedExerciseType?._id === type._id;

          return (
            <button
              key={type._id}
              // ✅ FIX 2: pass FULL OBJECT
              onClick={() => setSelectedExerciseType(type)}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`relative rounded-xl p-4 text-left transition-all duration-300 transform border-yellow-300/20
                ${
                  isSelected
                    ? "border-yellow-400 bg-yellow-400/10 scale-105 shadow-[0_0_22px_rgba(255,220,100,0.35)]"
                    : "border border-border bg-secondary/30 hover:border-yellow-400/50 hover:bg-yellow-400/10 hover:scale-105"
                }`}
            >
              <span className="text-3xl mb-2 block">
                {type.icon || "🏋️"}
              </span>

              <span className="font-medium text-foreground">
                {type.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
