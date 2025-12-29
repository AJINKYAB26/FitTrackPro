import React from "react";
import Navbar from "@/components/layout/Navbar";
import DietPlanCard from "../components/diet/DietPlanCard";
import { useFitness } from "../components/context/FitnessContext";
import { Apple, Droplets, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import AIDietGenerator from "../components/diet/AIDietGenerator";

const Diet = () => {
  const { user } = useFitness();

  const tips = [
    {
      icon: Apple,
      title: "Eat Whole Foods",
      description: "Focus on minimally processed, nutrient-dense foods",
    },
    {
      icon: Droplets,
      title: "Stay Hydrated",
      description: "Drink at least 3-4 liters of water daily",
    },
    {
      icon: Target,
      title: "Track Macros",
      description: "Monitor protein, carbs, and fats for optimal results",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold">
            Your <span className="text-yellow-400">Diet Plan</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Nutrition optimized for your {user?.goal || "fitness"} goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Diet Plan Card */}
          <div className="rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20">
            <DietPlanCard />
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            {/* Nutrition Tips */}
            <div className="rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20">
              <h3 className="text-xl font-bold mb-4">Nutrition Tips</h3>

              <div className="space-y-4">
                {tips.map((tip, index) => (
                  <div
                    key={tip.title}
                    className="flex items-start gap-3 p-3 bg-zinc-800 rounded-xl"
                  >
                    <div className="p-2 rounded-lg bg-yellow-300/10">
                      <tip.icon className="w-5 h-5 text-yellow-300" />
                    </div>

                    <div>
                      <p className="font-medium">{tip.title}</p>
                      <p className="text-sm text-gray-400">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Goal Info */}
            {/* <div className="rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20">
              <h3 className="text-xl font-bold mb-4">Goal Settings</h3>

              <div className="space-y-3">
                <div className="p-3 bg-zinc-800 rounded-xl">
                  <p className="text-sm text-gray-400">Current Goal</p>
                  <p className="font-semibold capitalize">{user?.goal || "Bulking"}</p>
                </div>

                <div className="p-3 bg-zinc-800 rounded-xl">
                  <p className="text-sm text-gray-400">Fitness Level</p>
                  <p className="font-semibold capitalize">{user?.fitnessLevel || "Intermediate"}</p>
                </div>

                <p className="text-xs text-gray-400 mt-4">
                  Your diet plan is automatically adjusted based on your goal and fitness level. Update your profile to change your nutrition plan.
                </p>
              </div>
            </div> */}
            <AIDietGenerator />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Diet;
