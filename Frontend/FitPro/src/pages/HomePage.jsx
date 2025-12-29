import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dumbbell,
  Flame,
  Utensils,
  Calculator,
  TrendingUp,
  Target,
  Users,
  Zap,
} from "lucide-react";
import LoginPopup from "./LoginPopup";
import { Button } from "../components/UI/button";


const HomePage = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  // Show login popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowLogin(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const closeLogin = () => setShowLogin(false);

  const features = [
    {
      icon: Dumbbell,
      title: "Custom Workouts",
      description: "Access 100+ exercises tailored to your fitness level",
    },
    {
      icon: Flame,
      title: "Calorie Tracking",
      description: "Track calories burned with precision",
    },
    {
      icon: Utensils,
      title: "Diet Plans",
      description: "Personalized meal plans for your goals",
    },
    {
      icon: Calculator,
      title: "Smart Calculator",
      description: "Calculate your calorie burn easily",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor daily and weekly progress",
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Set and achieve your fitness goals",
    },
  ];

  const stats = [
    { value: "100+", label: "Exercises" },
    { value: "10+", label: "Categories" },
    { value: "4", label: "Diet Plans" },
    { value: "3", label: "Fitness Levels" },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-900">

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center animate-fade-in">


{/* --- Badge/Pill Element (NOW AT THE TOP) --- */}
        <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-300/10 border border-yellow-300/20 mb-8 animate-fade-in"
        >
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-sm text-yellow-300 font-medium">Your Fitness Journey Starts Here</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="text-white">Transform Your</span>
          <br />
          {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-500">
            Body & Mind
          </span> */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-gray-300">
            Body & Mind
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-400 mb-8 max-w-2xl">
          Track workouts, monitor calories, follow personalized diet plans, and
          reach your fitness goals.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/register")}
            className="px-15 py-4 bg-yellow-300 text-black text-lg md:text-xl font-bold rounded-xl shadow-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
          >
            Get Started Free
          </button>

          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-3 border-2 font-bold text-lg md:text-xl border-yellow-300 text-white rounded-xl hover:bg-yellow-300/20 hover:text-white transition-all duration-300 hover:scale-105"
          >
            Already have an account ?
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-26 mt-16 animate-fade-in style={{ animationDelay: '0.4s' }">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold text-yellow-300 drop-shadow-[0_0_12px_rgba(253,224,71,0.8)]">
                {stat.value}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className={`w-6 h-10 rounded-full border-2 border-yellow-200/50 flex items-start justify-center p-2`}>
            <div className={`w-1 h-2 bg-yellow-200 rounded-full animate-pulse`} />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-15 px-4 bg-black">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Everything You Need To <span className="text-yellow-300">Succeed</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Our comprehensive fitness platform provides all the tools you need to track, plan, and achieve your fitness goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-zinc-900 rounded-xl p-6 shadow-lg hover:shadow-yellow-300/20 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-300/10 rounded-full mb-4">
                <feature.icon className="w-6 h-6 text-yellow-300" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-yellow-300/20 via-yellow-400/10 to-yellow-500/5 border border-yellow-300/30 animate-float relative overflow-hidden">

            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-yellow-400/30 blur-3xl" />

            <div className="relative z-10">
              {/* ICON */}
              <Users className="w-12 h-12 text-yellow-300 mx-auto mb-6 drop-shadow-[0_0_10px_rgba(253,224,71,0.6)]" />

              {/* TITLE */}
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                Ready to Start Your Journey?
              </h2>

              {/* DESCRIPTION */}
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Join thousands of users who have transformed their lives with our
                fitness platform. Start your free account today!
              </p>

              {/* BUTTON */}
              <Button
                onClick={() => navigate("/register")}
                className="px-15 py-4 border-2 bg-yellow-300 text-sm md:text-base border-yellow-300 text-black-300 rounded-xl hover:bg-yellow-300 hover:text-black transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(253,224,71,0.3)]"
              >
                Create Free Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      {/* <footer className="py-8 px-4 bg-black border-t border-zinc-800">
        <div className="text-center text-gray-400">
          © 2025 FitTrack Pro. All rights reserved.
        </div>
      </footer> */}
      <footer className="py-8 px-4 bg-black border-t border-yellow-300/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Logo and Brand Name */}
          <div className="flex items-center gap-2">
            {/* Logo Icon Container - using yellow-300 for the primary accent */}
            <div className="w-10 h-10 rounded-lg bg-yellow-300/20 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-yellow-300" />
            </div>
            {/* Brand Name */}
            <span className="font-bold text-xl text-white">FitTrack Pro</span>
          </div>

          {/* Copyright Text */}
          <p className="text-sm text-gray-400">
            © 2025 FitTrack Pro. All rights reserved.
          </p>
        </div>
      </footer>
      {/* LOGIN POPUP */}
      {showLogin && <LoginPopup close={closeLogin} />}
    </div>
  );
};

export default HomePage;
