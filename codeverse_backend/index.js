import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/api.js";
import { updateRanks } from "./controller/rankController.js";

const port = process.env.PORT || 3000;
const mongoDB_url = process.env.MONGODB_URI || process.env.mongoDB;
const app = express();

if (!mongoDB_url) {
  console.error("MongoDB URI missing! Please check MONGODB_URI or mongoDB in your .env file.");
} else {
  mongoose.connect(mongoDB_url)
    .then(() => {
      console.log("MongoDB connected successfully...");
      updateRanks();
    })
    .catch(err => console.error("MongoDB connection error:", err));
}

app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

export default app;
