import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../../lib/api";

const FitnessContext = createContext(null);

export const FitnessProvider = ({ children }) => {
  /* ===================== STATE ===================== */

  // Levels → beginner / intermediate / advanced
  const [levels, setLevels] = useState([]);

  // Exercise Types → legs / chest / shoulder
  const [exerciseTypes, setExerciseTypes] = useState([]);

  // Exercises list
  const [exercises, setExercises] = useState([]);

  // Selected values
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState(null);

  // Workout
  const [todaysWorkout, setTodaysWorkout] = useState([]);

  const [loadingExercises, setLoadingExercises] = useState(false);

  const [user, setUser] = useState(null);

  const [dailyStats, setDailyStats] = useState({
    caloriesBurned: 0,
    exercisesCompleted: 0,
    streak: 0,
  });

  const [workoutHistory, setWorkoutHistory] = useState([]);

  const [weeklyCalories, setWeeklyCalories] = useState(0);


  /* ===================== FETCH LEVELS ===================== */
 useEffect(() => {
  api.get("/categories")
    .then((res) => {
      console.log("Categories response:", res.data);
      setLevels(res.data.data || res.data || []);
    })
    .catch((err) => console.error("Levels error:", err));
}, []);


  /* ===================== FETCH EXERCISE TYPES ===================== */
 useEffect(() => {
  api.get("/exercise-types")
    .then((res) => {
      console.log("Exercise types response:", res.data);
      setExerciseTypes(res.data.data || res.data || []);
    })
    .catch((err) => console.error("Exercise types error:", err));
}, []);


  /* ===================== FETCH EXERCISES ===================== */
  console.log("RENDER → level:", selectedLevel);
  console.log("RENDER → type:", selectedExerciseType);

  useEffect(() => {
    if (!selectedLevel || !selectedExerciseType) return;

    setLoadingExercises(true);

    api
      .get("/exercises", {
        params: {
          Category: selectedLevel.slug,          // ✅ FIX
          exerciseType: selectedExerciseType.slug, // ✅ FIX
        },
      })
      .then((res) => {
        console.log("Exercises:", res.data);
        setExercises(res.data);
      })
      .catch((err) => console.error("Exercises error:", err))
      .finally(() => setLoadingExercises(false));
  }, [selectedLevel, selectedExerciseType]);

  /* ===================== WORKOUT ACTIONS ===================== */
  const addToWorkout = (exercise) => {
    setTodaysWorkout((prev) =>
      prev.find((e) => e._id === exercise._id)
        ? prev
        : [...prev, exercise]
    );
  };

  const removeFromWorkout = (id) => {
    setTodaysWorkout((prev) => prev.filter((e) => e._id !== id));
  };

  const clearWorkout = () => {
    setTodaysWorkout([]);
  };

  const saveWorkout = async () => {
    if (todaysWorkout.length === 0) return;

    try {
      const token = localStorage.getItem("token");

      const exercisesPayload = todaysWorkout.map((ex) => ({
        exerciseId: ex._id || ex.id,
        sets: Number(ex.sets) || 0,
        reps: Number(ex.reps) || 0,        // ✅ MUST be number
        weight: Number(ex.weight) || 0,
        caloriesBurned: Number(ex.caloriesBurn) || 0,
      }));

      await api.post(
        "/workouts",
        { exercises: exercisesPayload },   // ❌ no userId
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodaysWorkout([]);
    } catch (error) {
      console.error("Save workout failed:", error.response?.data || error);
    }
  };

  const fetchRecentWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await api.get(
        `/workouts/recent?userId=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWorkoutHistory(res.data.data);
    } catch (err) {
      console.error("Fetch recent workouts failed", err);
    }
  };


  const fetchTodayWorkout = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await api.get(
        `/workouts/today?userId=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const workout = res.data.data;

      if (workout) {
        setDailyStats({
          caloriesBurned: workout.totalCalories,
          exercisesCompleted: workout.exercises.length,
          streak: 1,  
        });
      }
    } catch (err) {
      console.error("Fetch today workout failed", err);
    }
  };

   const fetchWeeklyCalories = async () => {
    try {
      const res = await api.get("/workouts/weekly-calories");
      setWeeklyCalories(res.data.weeklyCalories || 0);
    } catch (err) {
      console.error("Weekly calories error", err);
    }
  };

  useEffect(() => {
    fetchRecentWorkouts();
    fetchTodayWorkout();
     fetchWeeklyCalories();
  }, []);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const payload = JSON.parse(atob(token.split(".")[1]));

  setUser({
    _id: payload.id,
    name: payload.name,
    role: payload.role,
    email: payload.email,
  });
}, []);


  /* ===================== CONTEXT ===================== */
  return (
    <FitnessContext.Provider
      value={{
        levels,
        exerciseTypes,
        exercises,

        selectedLevel,
        setSelectedLevel,

        selectedExerciseType,
        setSelectedExerciseType,

        todaysWorkout,
        addToWorkout,
        removeFromWorkout,
        clearWorkout,
        saveWorkout,

        loadingExercises,

        workoutHistory,

        // 🔹 USER DATA
        user,
        setUser,

        // 🔹 DASHBOARD STATS
        dailyStats,
        setDailyStats,

        // 🔹 WORKOUT HISTORY

        setWorkoutHistory,
        weeklyCalories,

      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const ctx = useContext(FitnessContext);
  if (!ctx) {
    throw new Error("useFitness must be used inside FitnessProvider");
  }
  return ctx;
};
