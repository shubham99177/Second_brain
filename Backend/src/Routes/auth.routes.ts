import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";
import User from "../Models/user.model";

const router = express.Router();

// 🔹 Email/Password Signup
router.post("/register", async (req: any, res: any) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      provider: "local",
    });

    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Email/Password Login
router.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Google Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user as any;
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.redirect(`http://localhost:5173/login-success?token=${token}`);
  }
);

// 🔹 LinkedIn Login
router.get(
  "/linkedin",
  passport.authenticate("linkedin", {
    scope: ["r_liteprofile", "r_emailaddress"],
  })
);

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", { session: false }),
  (req, res) => {
    const user = req.user as any;
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.redirect(`http://localhost:3000/login-success?token=${token}`);
  }
);

export default router;
