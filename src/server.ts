import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL as string;
const PORT = process.env.PORT ? Number(process.env.PORT) : 3003;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connection succeeded");
    console.log(`Server running on port ${PORT}`);
  })
  .catch((err) => {
    console.log("ERROR on MongoDB connection", err);
    process.exit(1);
  });
