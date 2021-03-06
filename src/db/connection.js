import "dotenv/config";
import mongoose from "mongoose";

const db = mongoose.connect;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/myFirstDatabase";

export const initMongoServer = () => {
  try {
    db(MONGODB_URI).catch(error => {
      throw error;
    });
    console.log("Connected to the Mongo Database")
  } catch (error) {
    console.error(error);
    throw error;
  }
}