import React from "react";
import { useFitness } from "../context/FitnessContext";
import { Button } from "../UI/button";
import { Plus, Check, Flame, Target, ExternalLink } from "lucide-react";

export const ExerciseCard = ({ exercise, index }) => {
  const { todaysWorkout, addToWorkout, removeFromWorkout } = useFitness();

  const isAdded = todaysWorkout.some((ex) => ex._id === exercise._id);

  const handleToggle = () => {
    isAdded
      ? removeFromWorkout(exercise._id)
      : addToWorkout(exercise);
  };

  return (
    <div
      className={`relative rounded-xl p-4 transition-all duration-300 border-yellow-300/20
        ${
          isAdded
            ? "border-yellow-400/50 bg-yellow-400/5"
            : "border border-border hover:border-yellow-400/40 hover:bg-yellow-400/5"
        }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold">{exercise.name}</h4>

            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 capitalize">
              {exercise.level}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            {exercise.description}
          </p>

          <div className="flex flex-wrap gap-5 text-sm">
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4 text-yellow-400" />
              {exercise.targetMuscle}
            </div>

            <span>
              {exercise.sets}×{exercise.reps}
            </span>

            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-400" />
              {exercise.caloriesBurn} cal/min
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Button
            onClick={handleToggle}
            size="sm"
            variant={isAdded ? "default" : "outline"}
            className="border-yellow-400/40 text-yellow-300"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 mr-1" /> Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-1" /> Add
              </>
            )}
          </Button>

          {exercise.videoUrl && (
            <a
              href={exercise.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-yellow-400 flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              Tutorial
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
