import express from "express";
import cors from "cors";
import userRouter from "./Routes/user.routes";
import cookieParser from "cookie-parser";
import path from "path";
import passport from "passport";
import "./config/auth"; // Make sure this file is setting up passport strategies
import authRoutes from "./Routes/auth.routes";
export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/v1/users", userRouter);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});
