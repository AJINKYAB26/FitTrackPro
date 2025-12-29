import React from "react";
import { useFitness } from "../context/FitnessContext";
import { ExerciseCard } from "./ExerciseCard";
import { Dumbbell } from "lucide-react";

export const ExerciseList = () => {
  const { selectedExerciseType, exercises, loadingExercises } = useFitness();

  if (!selectedExerciseType) {
    return (
      <div className="glass-card rounded-2xl p-6 text-center border border-yellow-300/20">
        <p className="text-muted-foreground">
          Select a category to view exercises
        </p>
      </div>
    );
  }

  if (loadingExercises) {
    return (
      <div className="glass-card rounded-2xl p-6 text-center">
        Loading exercises...
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 border border-yellow-300/20">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <Dumbbell className="text-yellow-400" size={22} />
          <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent ">
            Available Exercises
          </h3>
        </div>

        <span className="px-3 py-1 text-xs rounded-full border border-yellow-400/40 text-yellow-300">
          {exercises.length}
        </span>
      </div>

      <div className="grid gap-4">
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise._id}
            exercise={exercise}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
