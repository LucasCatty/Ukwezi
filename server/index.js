import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import ordersRouter from "./routes/orders.js";
import paymentRouter from "./routes/payment.js";
import feedbackRouter from "./routes/feedback.js";

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ukwezi";

app.use(cors());
app.use(express.json());

app.use("/api/orders", ordersRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/feedback", feedbackRouter);

app.get("/api/health", (_, res) => res.json({ status: "ok" }));

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.log("Server starting without database — orders will not persist.");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} (no DB)`));
  });
