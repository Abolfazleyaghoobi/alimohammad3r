// utils/mongo.js
import mongoose from "mongoose";

let isConnected = false; // حفظ وضعیت اتصال

export async function connectToDB() {
  if (isConnected) return; // اگر قبلاً وصل شده بود، دوباره وصل نشه

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
