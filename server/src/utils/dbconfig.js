import mongoose from "mongoose";

const DB_NAME = "test";
const DB_URL = "mongodb://127.0.0.1:27017";

console.log(DB_URL);

const connectDB = async () => {
  try {
    await mongoose.connect(`${DB_URL}/${DB_NAME}`);
    console.log("Mongo DB connection established");
  } catch (err) {
    console.log("MongoDB connection (configure) error: " + err);
    process.exit(1);
  }
};

export default connectDB;
