import { Router } from "express";
import Feedback from "../models/Feedback.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const fb = await Feedback.create(req.body);
    res.status(201).json({ success: true, feedback: fb });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/", async (_, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 }).limit(20);
  res.json(feedbacks);
});

export default router;
