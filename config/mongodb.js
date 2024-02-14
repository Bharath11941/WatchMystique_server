import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const dbConnect = () => {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connected successfully")
  }).catch((err) => {
    console.log(err.message)
  })
}
export default dbConnect;