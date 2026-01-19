const express = require("express");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { authMiddleware } = require("../middleware");

const bcrypt=require("bcrypt");

const { User,Account} = require("../db");
const { JWT_SECRET } = require("../config");

const router = express.Router();

/* =======================
   ZOD SCHEMAS
======================= */

const signupSchema = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6)
});

const signinSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6)
});

const updateSchema = z.object({
  password: z.string().min(6).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional()
}); 

/* =======================
   SIGNUP ROUTE
======================= */

router.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(411).json({
      message: "Incorrect inputs"
    });
  }

  const { username, firstName, lastName, password } = parsed.data;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs"
    });
  }
    const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    firstName,
    lastName,
    password:hashedPassword
  });

  await Account.create({
    userId: user._id,
    balance: Math.floor(Math.random() * 10000 + 1) * 100
  });

  const token = jwt.sign(
    {
      userId: user._id
    },
    JWT_SECRET
  );

  res.status(200).json({
    message: "User created successfully",
    token: token
  });
});

/* =======================
   SIGNIN ROUTE
======================= */

router.post("/signin", async (req, res) => {
  const parsed = signinSchema.safeParse(req.body);


  if (!parsed.success) {
    return res.status(411).json({
      message: "Error while logging in"
    });
  }

  const { username, password } = parsed.data;

 const user = await User.findOne({ username });

if (!user) {
  return res.status(411).json({
    message: "Error while logging in"
  });
}

const passwordMatch = await bcrypt.compare(password, user.password);

if (!passwordMatch) {
  return res.status(411).json({
    message: "Error while logging in"
  });
}

  if (!user) {
    return res.status(411).json({
      message: "Error while logging in"
    });
  }

  const token = jwt.sign(
    {
      userId: user._id
    },
    JWT_SECRET
  );

  res.status(200).json({
    token: token
  });
});


router.put("/", authMiddleware, async (req, res) => {
  const parsed = updateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(411).json({
      message: "Incorrect inputs"
    });
  }

  try {
    await User.updateOne(
      { _id: req.userId },
      parsed.data
    );

    res.status(200).json({
      message: "Updated successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while updating information"
    });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i"
        }
      },
      {
        lastName: {
          $regex: filter,
          $options: "i"
        }
      }
    ]
  });

  res.status(200).json({
    users: users.map(user => ({
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }))
  });
});

module.exports = router;
