import React from "react";
import Navbar from "../components/layout/navbar";
import { LevelSelector } from "../components/exercise/LevelSelector";
import { CategorySelector } from "../components/exercise/CategorySelector";
import { ExerciseList } from "../components/exercise/ExerciseList";
import WorkoutCard from "../components/dashboard/WorkoutCard";
import { Button } from "@/components/ui/button"; // if needed for actions

const Exercises = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold">
            Build Your{" "}
            <span className="text-yellow-400">Workout</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Select your level and category to find the perfect exercises
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Level */}
            <div className="rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20 hover:bg-zinc-800/70 transition-all duration-300">
              <LevelSelector />
            </div>

            {/* Category */}
            <div className="rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20 hover:bg-zinc-800/70 transition-all duration-300">
              <CategorySelector />
            </div>

            {/* Exercise List */}
            <div className="rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20 hover:bg-zinc-800/70 transition-all duration-300">
              <ExerciseList />
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20 hover:bg-zinc-800/70 transition-all duration-300">
              <WorkoutCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Exercises;
