import dotenv from "dotenv";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

import express from "express";
import cors from "cors";

connectDB();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://waff-n-burg-pos.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Waff N Burg API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
