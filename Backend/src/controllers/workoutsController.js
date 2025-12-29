import Workout from "../models/Workout.js";

export const createWorkout = async (req, res) => {
  try {
    const { exercises } = req.body;
    const userId = req.user._id;

    if (!exercises || exercises.length === 0) {
      return res.status(400).json({ message: "No exercises provided" });
    }

    // 📅 Get today's date range
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // ❌ Check if workout already done today
    const alreadyDone = await Workout.findOne({
      userId,
      createdAt: { $gte: start, $lte: end },
    });

    if (alreadyDone) {
      return res.status(400).json({
        message: "Workout already completed today",
      });
    }

    // 🔥 Calculate calories
    const totalCalories = exercises.reduce(
      (acc, ex) => acc + (ex.caloriesBurned || 0),
      0
    );

    // ✅ Save workout
    const workout = await Workout.create({
      userId,
      exercises,
      totalCalories,
    });

    const user = await User.findById(userId);

    const today = new Date().toDateString();
    const lastWorkout = user.lastWorkoutDate
      ? new Date(user.lastWorkoutDate).toDateString()
      : null;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastWorkout === yesterdayStr) {
      user.streak += 1; // continue streak
    } else {
      user.streak = 1; // reset streak
    }

    user.lastWorkoutDate = new Date();
    await user.save();

    res.status(201).json({
      success: true,
      message: "Workout logged successfully",
      data: {
        workout,
        streak: user.streak,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getTodayWorkout = async (req, res) => {
  try {
    const userId = req.user._id;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const workout = await Workout.findOne({
      userId,
      createdAt: { $gte: start, $lte: end },
    }).populate("exercises.exerciseId");

    res.json({ success: true, data: workout });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getRecentWorkouts = async (req, res) => {
  try {
    const userId = req.user._id;

    const workouts = await Workout.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("createdAt exercises totalCalories");

    const formatted = workouts.map(w => ({
      id: w._id,
      date: w.createdAt,
      exerciseCount: w.exercises.length,
      totalCalories: w.totalCalories,
    }));

    res.json({ success: true, data: formatted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getWeeklyCalories = async (req, res) => {
  try {
    const userId = req.user._id;

    const start = new Date();
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);

    const workouts = await Workout.find({
      userId,
      createdAt: { $gte: start },
    }).select("totalCalories createdAt");

    const weeklyCalories = workouts.reduce(
      (acc, w) => acc + w.totalCalories,
      0
    );

    res.json({
      success: true,
      weeklyCalories,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
