import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: String,
  message: String,
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Feedback", feedbackSchema);
