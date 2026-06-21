import { Router } from "express";

const router = Router();

router.post("/momo", async (req, res) => {
  const { phone, amount } = req.body;
  // Simulate MTN MoMo / Airtel Money payment request
  // In production, integrate with:
  //   - Africa's Talking Payments API
  //   - or direct MTN MoMo API (requires merchant account)
  console.log(`[MOMO] Requesting ${amount} RWF from ${phone}`);
  res.json({ success: true, message: "Payment request sent to your phone. Check Momo for prompt." });
});

router.post("/confirm", async (req, res) => {
  const { orderId, transactionId } = req.body;
  console.log(`[PAYMENT] Confirmed: Order ${orderId}, TXN ${transactionId}`);
  res.json({ success: true, message: "Payment confirmed. Order is being prepared." });
});

export default router;
