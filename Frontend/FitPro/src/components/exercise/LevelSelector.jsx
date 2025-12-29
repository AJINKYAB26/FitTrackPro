import React from "react";
import { useFitness } from "../context/FitnessContext";

export const LevelSelector = () => {
  const { levels, selectedLevel, setSelectedLevel } = useFitness();

  if (!levels || levels.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6 text-gray-400">
        Loading levels...
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-xl font-bold font-display text-foreground mb-4">
        Fitness Level
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {levels.map((level) => {
          // ✅ compare by _id
          const isSelected = selectedLevel?._id === level._id;

          return (
            <button
              key={level._id}
              // ✅ PASS FULL OBJECT
              onClick={() => setSelectedLevel(level)}
              className={`relative p-4 rounded-xl border border-yellow-300/20 text-center transition-all duration-300
                ${
                  isSelected
                    ? "border-yellow-400 bg-yellow-200/10 scale-105 shadow-[0_0_25px_rgba(255,220,100,0.45)]"
                    : "border-border bg-secondary/30 hover:border-yellow-400 hover:bg-yellow-200/10 hover:scale-105"
                }`}
            >
              <span className="text-2xl block mb-2">
                {level.icon || "🔥"}
              </span>

              <span className="font-medium text-foreground block">
                {level.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
