import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "../src/routes/auth.routes.js";
import connectDB from "../src/config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(async (_req, _res, next) => {
  await connectDB();
  next();
});

app.use("/api/auth", authRoutes);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

export default app;
