import React from "react";
import { Trash2, Flame, Clock } from "lucide-react";
import { Button } from "../UI/button";
import { useFitness } from "../context/FitnessContext";

const WorkoutCard = () => {
  const {
    todaysWorkout = [],
    removeFromWorkout,
    saveWorkout,
    clearWorkout,
  } = useFitness();

  // ✅ Safe calculations
  const totalCalories = todaysWorkout.reduce(
    (acc, ex) => acc + (ex.caloriesBurn || 0),
    0
  );

  const estimatedDuration = todaysWorkout.reduce(
    (acc, ex) => acc + (ex.sets || 0) * 3,
    0
  );

  return (
    <div
      className="
        bg-zinc-900 rounded-2xl p-6
        border border-yellow-300/20
        hover:shadow-yellow-300/20
        transition-all duration-300
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">
          Today's Workout
        </h3>

        {todaysWorkout.length > 0 && (
          <button
            onClick={clearWorkout}
            className="text-sm text-gray-400 hover:text-red-400"
          >
            Clear all
          </button>
        )}
      </div>

      {/* EMPTY STATE */}
      {todaysWorkout.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400">No exercises added yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Select exercises to build your workout
          </p>
        </div>
      ) : (
        <>
          {/* WORKOUT LIST */}
          <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
            {todaysWorkout.map((exercise) => (
              <div
                key={exercise.id}
                className="
                  flex items-center justify-between
                  p-3 rounded-xl
                  bg-black/40
                  border border-yellow-300/10
                  hover:border-yellow-300/30
                  transition-all
                "
              >
                <div>
                  <p className="font-medium text-white">
                    {exercise.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {exercise.sets} × {exercise.reps}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-yellow-300">
                    ~{exercise.caloriesBurn} kcal
                  </span>

                  <button
                    onClick={() => removeFromWorkout(exercise.id)}
                    className="p-2 rounded-lg hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="border-t border-yellow-300/20 pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Flame className="w-4 h-4 text-yellow-300" />
                Est. Calories
              </div>
              <span className="font-bold text-yellow-300">
                {totalCalories} kcal
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4 text-yellow-300" />
                Est. Duration
              </div>
              <span className="font-bold text-yellow-300">
                {estimatedDuration} min
              </span>
            </div>
          </div>

          {/* ACTION */}
          <Button
            className="w-full mt-5 bg-yellow-300 text-black font-bold hover:bg-yellow-400 transition"
            onClick={saveWorkout}
          >
            Complete Workout 🎉
          </Button>
        </>
      )}
    </div>
  );
};

export default WorkoutCard;
