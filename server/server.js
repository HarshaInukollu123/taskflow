import express, {json} from 'express';
import { connect } from 'mongoose';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

app.use('/api/auth', authRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Hello from TaskFlow backend!');
});

// Start the server
if (process.env.NODE_ENV !== "test") {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));
  }

export default app;

