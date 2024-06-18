import db from "@repo/db/client";
import express from "express";
import { z } from "zod";

const app = express();

app.use(express.json());

const paymentSchema = z.object({
  token: z.string(),
  user_identifier: z.string().regex(/^\d+$/, "User ID must be a number"),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Amount must be a number"),
});

app.post("/hdfcWebhook", async (req, res) => {
  const result = paymentSchema.safeParse(req.body);
  console.log(result);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  const paymentInformation = {
    token: result.data.token,
    userId: result.data.user_identifier,
    amount: result.data.amount,
  };

  const receivedSecret = req.headers["x-hdfc-secret"];
  const expectedSecret = process.env.HDFC_SECRET;

  if (receivedSecret != expectedSecret) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
