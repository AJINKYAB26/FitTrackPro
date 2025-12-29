import React, { useState } from 'react';
import { Button } from '../../components/UI/button';
import { Input } from '../../components/UI/Input';
import { Label } from '../../components/UI/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/UI/select';
import { useFitness } from '../context/FitnessContext';
import { exercises } from '../../data/exercises';
import { Calculator, Flame, Clock } from 'lucide-react';

export const CalorieCalculator = () => {
  const { user } = useFitness();
  const [selectedExercise, setSelectedExercise] = useState('');
  const [duration, setDuration] = useState('30');
  const [customWeight, setCustomWeight] = useState(user?.weight?.toString() || '70');
  const [result, setResult] = useState(null);

  const calculateCalories = () => {
    const exercise = exercises.find((ex) => ex.id === selectedExercise);
    if (!exercise) return;

    const weight = parseFloat(customWeight);
    const time = parseFloat(duration) / 60; // Convert to hours
    
    // Calories = MET × Weight (kg) × Time (hours)
    const calories = Math.round(exercise.metValue * weight * time);
    setResult(calories);
  };

  return (
    <div className="rounded-2xl p-6 bg-zinc-900 border border-yellow-300/20 animate-fade-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-yellow-400/10">
          <Calculator className="w-6 h-6 text-yellow-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-display text-white">Calorie Calculator</h3>
          <p className="text-gray-400 text-sm">Calculate calories burned per exercise</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Exercise Select */}
        <div className="space-y-2">
          <Label className="text-white">Select Exercise</Label>
          <Select value={selectedExercise} onValueChange={setSelectedExercise}>
            <SelectTrigger className="input-field h-12 bg-zinc-800 text-white border border-yellow-300/30">
              <SelectValue placeholder="Choose an exercise" />
            </SelectTrigger>
            <SelectContent className="max-h-64 bg-zinc-800 text-white">
              {exercises.map((exercise) => (
                <SelectItem key={exercise.id} value={exercise.id}>
                  {exercise.name} (MET: {exercise.metValue})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Weight & Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white">Weight (kg)</Label>
            <Input
              type="number"
              value={customWeight}
              onChange={(e) => setCustomWeight(e.target.value)}
              className="input-field h-12 bg-zinc-800 text-white border border-yellow-300/30"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Duration (min)</Label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="input-field h-12 bg-zinc-800 text-white border border-yellow-300/30"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <Button onClick={calculateCalories} variant="hero" className="w-full">
          Calculate Calories
        </Button>

        {/* Result Card */}
        {result !== null && (
          <div className="p-4 bg-yellow-400/10 rounded-xl border border-yellow-300/30 animate-scale-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Estimated Calories Burned</p>
                  <p className="text-3xl font-bold font-display text-yellow-400">{result} kcal</p>
                </div>
              </div>
              <div className="text-right text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{duration} min</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formula Info */}
        <div className="text-xs text-gray-400 mt-4 p-3 bg-zinc-800 rounded-lg border border-yellow-300/20">
          <p className="font-medium mb-1">Formula:</p>
          <p>Calories = MET × Weight (kg) × Time (hours)</p>
          <p className="mt-2">
            MET (Metabolic Equivalent of Task) represents the energy cost of physical activities.
          </p>
        </div>
      </div>
    </div>
  );
};
