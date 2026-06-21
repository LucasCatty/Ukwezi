import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  items: Number,
  totalRwf: Number,
  paymentMethod: { type: String, enum: ["momo", "airtel", "bank"] },
  customer: {
    name: String,
    phone: String,
    location: String,
    note: String,
  },
  status: { type: String, default: "pending", enum: ["pending", "paid", "delivered", "cancelled"] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
