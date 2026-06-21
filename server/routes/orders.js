import { Router } from "express";
import Order from "../models/Order.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const order = new Order({ ...req.body, id: `UKW-${Date.now()}`, status: "pending" });
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/", async (_, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

router.patch("/:id/pay", async (req, res) => {
  const order = await Order.findOneAndUpdate({ id: req.params.id }, { status: "paid" }, { new: true });
  res.json(order);
});

export default router;
