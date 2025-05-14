import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",                       
  "https://taskflow-ten-gamma.vercel.app",       
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

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
