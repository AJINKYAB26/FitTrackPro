import Navbar from "../components/layout/navbar";
import StatsCard from "../components/dashboard/StatsCard";
import WorkoutCard from "../components/dashboard/WorkoutCard";
import { useFitness } from "../components/context/FitnessContext";
import {
  Flame,
  Target,
  Zap,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user, dailyStats, workoutHistory = [], } = useFitness();


  const { weeklyCalories } = useFitness();


  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold">
            Welcome back,{" "}
            <span className="text-yellow-400">
              {user?.name?.split(" ")[0] || "Athlete"}
            </span>
          </h1>

          <p className="text-gray-400 mt-2">
            Let’s crush your fitness goals 💪
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatsCard title="Calories Burned" value={dailyStats.caloriesBurned} icon={Flame} />
          <StatsCard title="Exercises" value={dailyStats.exercisesCompleted} icon={Target} />
          <StatsCard title="Weekly Calories" value={weeklyCalories ?? 0} icon={TrendingUp} />
          <StatsCard title="Streak" value={`${dailyStats.streak} days`} icon={Zap} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Workout */}
          <WorkoutCard />

          {/* Right Section */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20">
              <h3 className="text-xl font-bold mb-4">Quick Start</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/exercises">
                  <Button variant="glass" className="w-full h-20">
                    <Target className="mr-2" /> Exercises
                  </Button>
                </Link>
                <Link to="/diet">
                  <Button variant="glass" className="w-full h-20">
                    <Calendar className="mr-2" /> Diet Plan
                  </Button>
                </Link>
              </div>
            </div>

            {/* Profile
            <div className="rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20">
              <h3 className="text-xl font-bold mb-4">Your Profile</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-zinc-800 p-3 rounded-xl">
                  <p className="text-gray-400">Level</p>
                  <p className="font-semibold capitalize">{user?.fitnessLevel}</p>
                </div>
                <div className="bg-zinc-800 p-3 rounded-xl">
                  <p className="text-gray-400">Goal</p>
                  <p className="font-semibold capitalize">{user?.goal}</p>
                </div>
                <div className="bg-zinc-800 p-3 rounded-xl">
                  <p className="text-gray-400">Weight</p>
                  <p className="font-semibold">{user?.weight} kg</p>
                </div>
                <div className="bg-zinc-800 p-3 rounded-xl">
                  <p className="text-gray-400">Height</p>
                  <p className="font-semibold">{user?.height} cm</p>
                </div>
              </div>
            </div> */}


            {/* ================= RECENT ACTIVITY ================= */}
            <div className="rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20">
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>

              {workoutHistory.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No workouts completed yet
                </p>
              ) : (
                <div className="space-y-3">
                  {workoutHistory.map((w, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-zinc-800 p-3 rounded-xl"
                    >
                      <div>
                        <p className="font-medium">
                          {new Date(w.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-400">
                          {w.exercisesCount} exercises
                        </p>
                      </div>

                      <span className="text-yellow-300 font-semibold">
                        {w.totalCalories} kcal
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
