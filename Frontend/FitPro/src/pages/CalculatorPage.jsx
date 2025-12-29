import React from 'react';
import Navbar from '../components/layout/navbar';
import { CalorieCalculator } from '../components/calculator/CalorieCalculator';
import { Flame, Info, Clock } from 'lucide-react';
import { Button } from '../components/UI/button';
import { Link } from 'react-router-dom';

const CalculatorPage = () => {
  const metExamples = [
    { activity: 'Sitting quietly', met: 1.0 },
    { activity: 'Walking (3 mph)', met: 3.5 },
    { activity: 'Weight lifting', met: 3.5 },
    { activity: 'Running (6 mph)', met: 9.8 },
    { activity: 'Swimming', met: 7.0 },
    { activity: 'Cycling (moderate)', met: 6.0 },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold">
            Calorie <span className="text-yellow-400">Calculator</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Calculate how many calories you burn during exercise 💪
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Calorie Calculator */}
          <div className="animate-fade-up">
            <CalorieCalculator />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* MET Explanation */}
            <div className="rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20 animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-display text-foreground">
                  What is MET?
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                MET (Metabolic Equivalent of Task) is a measure of the energy cost of physical activities.
                1 MET = energy used sitting quietly (about 1 kcal/kg/hour).
              </p>
              <div className="space-y-2">
                {metExamples.map((example, index) => (
                  <div
                    key={example.activity}
                    className="flex items-center justify-between p-2 bg-zinc-800 rounded-lg text-sm"
                  >
                    <span className="text-gray-300">{example.activity}</span>
                    <span className="font-semibold text-yellow-300">{example.met}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20 animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-accent/10">
                  <Flame className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-bold font-display text-foreground">
                  Quick Facts
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300">•</span>
                  <span>1 pound of fat = ~3,500 calories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300">•</span>
                  <span>Higher MET = more calories burned per minute</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300">•</span>
                  <span>Body weight affects calorie burn rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300">•</span>
                  <span>Intensity matters more than duration</span>
                </li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20 animate-fade-up">
              <h3 className="text-xl font-bold mb-4">Quick Start</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/exercises">
                  <Button variant="glass" className="w-full h-20">
                    <Flame className="mr-2" /> Exercises
                  </Button>
                </Link>
                <Link to="/diet">
                  <Button variant="glass" className="w-full h-20">
                    <Clock className="mr-2" /> Diet Plan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalculatorPage;
