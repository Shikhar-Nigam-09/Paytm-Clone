// backend/routes/account.js
const express = require("express");
const { Account,Transaction } = require("../db");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");
const router = express.Router();


router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId
  });

  res.status(200).json({
    balance: account.balance
  });
});



router.post("/transfer", authMiddleware, async (req, res) => {
  const { to, amount } = req.body;

  if (!to || !amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  let txn;

  try {
    // 1️⃣ Create PENDING transaction FIRST (durability)
    txn = await Transaction.create({
      fromUserId: req.userId,
      toUserId: to,
      amount,
      status: "PENDING"
    });

    // 2️⃣ Fetch sender
    const fromAccount = await Account.findOne({
      userId: req.userId
    });

    if (!fromAccount || fromAccount.balance < amount) {
      await Transaction.updateOne(
        { _id: txn._id },
        { status: "FAILED" }
      );
      return res.status(400).json({
        message: "Insufficient balance"
      });
    }

    // 3️⃣ Fetch receiver
    const toAccount = await Account.findOne({
      userId: to
    });

    if (!toAccount) {
      await Transaction.updateOne(
        { _id: txn._id },
        { status: "FAILED" }
      );
      return res.status(400).json({
        message: "Invalid receiver"
      });
    }

    // 4️⃣ Debit sender
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    );

    // 5️⃣ Credit receiver
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    );

    // 6️⃣ Mark transaction SUCCESS
    await Transaction.updateOne(
      { _id: txn._id },
      { status: "SUCCESS" }
    );

    res.status(200).json({
      message: "Transfer successful"
    });

  } catch (err) {
    console.error(err);

    // Safety net
    if (txn) {
      await Transaction.updateOne(
        { _id: txn._id },
        { status: "FAILED" }
      );
    }

    res.status(500).json({
      message: "Transfer failed"
    });
  }
});


router.get("/transactions", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { fromUserId: req.userId },
        { toUserId: req.userId }
      ]
    })
      .sort({ createdAt: -1 })
      .populate("fromUserId", "firstName lastName")
      .populate("toUserId", "firstName lastName");

    res.status(200).json({
      transactions
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch transactions"
    });
  }
});





module.exports = router;
