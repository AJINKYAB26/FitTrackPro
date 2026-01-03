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
import { motion, useMotionValue, useTransform } from "framer-motion";
import LoginPopup from "./LoginPopup";
import { Button } from "../components/UI/button";

const HomePage = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  // const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // const heroX = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [-15, 15]);
  // const heroY = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [-10, 10]);
  const isMobile = window.innerWidth < 768;
  const heroX = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], isMobile ? [0, 0] : [-15, 15]);
  const heroY = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], isMobile ? [0, 0] : [-10, 10]);


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

  const particles = Array.from({ length: 30 });

  return (
    <div
      className="relative min-h-screen bg-black text-gray-900 overflow-hidden"
      onMouseMove={(e) => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
      }}
    >
      {/* ================= FLOATING BACKGROUND ICONS ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[Dumbbell, Flame, Target, TrendingUp].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300/10"
            style={{
              top: `${10 + i * 20}%`,
              left: `${5 + i * 20}%`,
            }}
            animate={{ y: [0, -40, 0] }}
            transition={{ duration: 8 + i, repeat: Infinity }}
          >
            <Icon size={160} />
          </motion.div>
        ))}
      </div>
      {/* ================= FLOATING PARTICLES ================= */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-yellow-300/30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50 + Math.random() * 100, 0],
            x: [0, -50 + Math.random() * 100, 0],
          }}
          transition={{ duration: 10 + Math.random() * 15, repeat: Infinity }}
        />
      ))}

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">

        {/* Original Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-300/10 border border-yellow-300/20 mb-4">
          <Zap className="w-4 h-4 text-yellow-300" />
          <span className="text-sm text-yellow-300 font-medium">
            Your Fitness Journey Starts Here
          </span>
        </div>

        {/* ================= AI POWERED BADGE ================= */}
        {/* ================= NEXT-LEVEL AI POWERED BADGE ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50, y: -50 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          whileHover={{ scale: 1.3, rotate: [0, 5, -5, 0] }}
          whileTap={{ scale: 1.1 }}
          onClick={() => alert("AI is scanning your body...")}
          className="absolute top-10 right-10 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/40 via-yellow-300/30 to-yellow-400/40 border border-yellow-300/50 backdrop-blur-md shadow-xl shadow-yellow-400/50 cursor-pointer z-50"
        >
          {/* Rotating Neon Rings */}
          <motion.div
            className="absolute inset-0 rounded-full border border-yellow-300/50"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-yellow-300/30"
            animate={{ rotate: [360, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          />

          <Zap className="w-5 h-5 text-yellow-300 animate-pulse relative z-10" />
          <motion.span
            className="text-sm font-bold text-yellow-300 tracking-wide relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1, color: "#fff" }}
          >
            AI Powered
          </motion.span>
        </motion.div>

        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-yellow-300/60 blur-sm"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -20 + Math.random() * 40, 0], x: [0, -10 + Math.random() * 20, 0] }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}


        <motion.h1
          style={{ x: heroX, y: heroY }}
          initial={{ opacity: 0, y: -100 }} // starts above the screen
          animate={{ opacity: 1, y: 0 }}    // drops into original position
          transition={{ type: "spring", stiffness: 120, damping: 30, delay: 0.4 }} // spring effect for smooth drop
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
        >
          <span className="text-white">Transform Your</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-gray-300">
            Body & Mind
          </span>
        </motion.h1>


        <motion.p
          initial={{ opacity: 0, y: 30 }}    // starts slightly below
          animate={{ opacity: 1, y: 0 }}     // slides into original position
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }} // delay slightly after the heading
          className="text-lg md:text-2xl text-gray-400 mb-8 max-w-2xl"
        >
          Track workouts, monitor calories, follow personalized diet plans, and
          reach your fitness goals.
        </motion.p>


        <div className="flex gap-4">
          <button
            onClick={() => navigate("/register")}
            className="px-15 py-4 bg-yellow-300 text-black text-lg md:text-xl font-bold rounded-xl shadow-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
          >
            Get Started Free
          </button>

          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-3 border-2 font-bold text-lg md:text-xl border-yellow-300 text-white rounded-xl hover:bg-yellow-300/20 transition-all duration-300 hover:scale-105"
          >
            Already have an account ?
          </button>
        </div>

        {/* ================= STATS WITH GLOW LINES ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-16 relative">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 relative cursor-pointer"
              whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
            >
              {/* Glowing Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-yellow-300/30 blur-xl pointer-events-none"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Floating Particles Around Each Stat */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-yellow-300/50 blur-sm"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -8 + Math.random() * 16, 0],
                    x: [0, -8 + Math.random() * 16, 0],
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 2 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}

              {/* Number with Gradient (No Pulse) */}
              <motion.div
                className="text-5xl font-extrabold relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.6, ease: "easeOut" }}
              >
                {stat.value}
              </motion.div>

              {/* Label */}
              <motion.div
                className="text-gray-300 relative z-10 mt-1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.6, ease: "easeOut" }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ACHIEVEMENT PREVIEW ================= */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-black"
      >
        {/* Section Title */}
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Your <span className="text-yellow-300">Progress Preview</span>
          </h2>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { value: 21, suffix: " Days", label: "🔥 Workout Streak" },
            { value: 8420, suffix: " kcal", label: "⚡ Calories Burned" },
            { value: 4, suffix: "", label: "🏆 Fitness Level" },
            { value: 120, suffix: "+", label: "Exercises Completed" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="relative p-6 rounded-2xl backdrop-blur-md bg-zinc-900/20 border border-yellow-300/20 shadow-lg cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.05, rotateX: 3, rotateY: 3 }}
            >
              {/* Highlight Pulse */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-yellow-300/10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 0.3, 0] }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Value with Animated Counter */}
              <motion.div
                className="text-3xl md:text-4xl font-bold text-yellow-300 relative z-10"
                initial={{ count: 0 }}
                animate={{ count: item.value }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                {Math.floor(item.value)}
                {item.suffix}
              </motion.div>

              <div className="text-gray-300 mt-2 relative z-10">{item.label}</div>

              {/* Glow lines (optional) */}
              <div className="absolute top-0 left-0 w-full h-full rounded-2xl border border-yellow-300/30 blur-xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </motion.section>


      {/* ================= FEATURES SECTION WITH GLASSMORPHIC PANELS ================= */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-15 px-4 bg-black z-10 relative"
      >
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Everything You Need To <span className="text-yellow-300">Succeed</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Our comprehensive fitness platform provides all the tools you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-zinc-900/30 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-yellow-300/20 transition-all duration-300 hover:-translate-y-2 border border-yellow-300/10"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-300/10 rounded-full mb-4">
                <feature.icon className="w-6 h-6 text-yellow-300" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-yellow-300/20 via-yellow-400/10 to-yellow-500/5 border border-yellow-300/30 relative">
            <Users className="w-12 h-12 text-yellow-300 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-300 mb-8">
              Join thousands of users transforming their lives.
            </p>

            <Button
              onClick={() => navigate("/register")}
              className="px-6 md:px-12 py-4 bg-yellow-300 text-black font-bold rounded-xl hover:scale-105"
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 bg-black border-t border-yellow-300/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-yellow-300" />
            <span className="font-bold text-xl text-white">FitTrack Pro</span>
          </div>
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
