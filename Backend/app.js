import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./src/config/db.js";
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import userRoutes from "./src/routes/authRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import exerciseTypeRoutes from "./src/routes/exerciseTypeRoutes.js";
import exerciseRoutes from "./src/routes/exerciseRoutes.js";
import dietRoutes from "./src/routes/dietRoutes.js";
import workoutRoutes from "./src/routes/workoutsRoutes.js";
import dietaiRoutes from "./src/routes/dietai.routes.js";
import sendemaildiet from "./src/routes/dietEmail.routes.js"

console.log("OPENAI KEY:", process.env.OPENAI_API_KEY);


connectDB();

const app = express();
import path from 'path'

app.use(express.json());
app.use(
  cors({
    origin: "*", 
    credentials: true,              
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/exercise-types", exerciseTypeRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/diets", dietRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/diet", dietaiRoutes);
app.use("/api/emaildiet", sendemaildiet);

console.log("OPENAI KEY:", process.env.HF_API_KEY);

app.use(express.static(path.join(__dirname,"build")));

app.get("/",(req,res) =>{
  res.sendFile(path.join(__dirname,"build","index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
