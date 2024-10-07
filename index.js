import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './src/router/userRouter.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api', userRoutes);

mongoose.connect("mongodb+srv://kog:Ankn151603!@cluster0.ylu2l.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Connection error', error.message);
  });
