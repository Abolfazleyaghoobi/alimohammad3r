import { Telegraf } from "telegraf";
import start from "../commond/start.js";
import text from "../eventHandler/chat.js";
import callback from "../eventHandler/callback.js";
import { connectToDB } from "../config/db.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

// ثبت هندلرها
bot.start(start);
bot.on("message", text);
bot.on("callback_query", callback);

// حالت وبهوک – بدون launch
export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        await connectToDB(); // ← قبل از هر query
        await bot.handleUpdate(req.body);
        return res.status(200).send("ok");
      } catch (error) {
        console.error("Error handling update:", error);
        return res.status(500).send("error");
      }
    }
    res.status(405).send("Method Not Allowed");
  }
