import express from 'express';
import { PORT, mongoURL } from './config.js';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRotes.js';
import cors from 'cors';

const app = express();

// Middleware for passing req body
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors()); // Option 1: Allow all origins
// app.use(cors({
//   origin: 'http://localhost:5173/',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type']
// })); // Option 2: Allow custom origins

// Use Book Routes
app.use('/books', bookRoutes);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
