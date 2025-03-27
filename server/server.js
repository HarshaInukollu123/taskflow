import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello from TaskFlow backend!");
});

// Database Connection Function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    process.exit(1);
  }
};

// Start Server & Connect to DB (Only if NOT in Test Mode)
if (process.env.NODE_ENV !== "test") {
  connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
