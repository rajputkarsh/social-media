import mongoose from "mongoose";

export const connectToDatabase = () => {
  mongoose.set('strictQuery', true);
  return mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`
  );  
}