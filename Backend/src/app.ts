import express from "express";
import cors from "cors";
import userRouter from "./Routes/user.routes";
import cookieParser from "cookie-parser";
import path from "path";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});
app.get("/test", (req, res) => {
  res.send("test is running");
});
