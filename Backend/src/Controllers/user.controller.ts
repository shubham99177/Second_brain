import { RequestHandler } from "express";
import User, { IUser } from "../Models/user.model";
import { uservalidater } from "../utils/uservalidater";
import mongoose from "mongoose";
import { Content } from "../Models/Content.model";
import { Link } from "../Models/link.model";
import { Tag } from "../Models/tags.model";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

export type Message = {
  message: string;
  status: number;
};

export const signup = async (req: any, res: any, next: any) => {
  try {
    const { username, password } = req.body;

    console.log(username, password);

    const error: Message | null = uservalidater(username, password);

    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(403).json({ message: "User already exists" });
    }

    const newUser = new User({ username, password });

    await newUser.save();

    return res.json({ message: "Signup successfully", status: 200 });
  } catch (err) {
    next(err); // Use next for error handling
  }
};

export const signin = async (req: any, res: any, next: any) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid password" });
    }

    const token = user.generateToken();
    // Uncomment if token logic is implemented
    console.log(token);

    return res

      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours});
      })
      .json({ message: "Signin successfully", status: 200, token });
  } catch (err) {
    next(err); // Use next for error handling
  }
};

export const createcontent = async (req: any, res: any, next: any) => {
  try {
    const link = req.body.link;
    const type = req.body.type;
    await Content.create({
      link,
      type,
      title: req.body.title,
      userId: req.user.userId,
      tags: [],
    });

    res.json({
      message: "Content added",
    });
  } catch (error) {}
};

export const deleteContent = async (req: any, res: any, next: any) => {
  try {
    const contentId = req.params.id;

    const content = await Content.findByIdAndDelete(contentId);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json({
      message: "Content deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const getsharelink = async (req: any, res: any, next: any) => {
  try {
    const { share } = req.body;

    // if (!share) {
    //   const findlink = await Link.findByIdAndDelete({
    //     userId: req.user.userId,
    //   });

    //   return res
    //     .status(400)
    //     .json({
    //       error: "Invalid request. ",
    //       message: "Could not delete shareable link.",
    //     });
    // }

    // Generate a unique hash for the shareable link
    const hash = crypto.randomBytes(16).toString("hex");

    // Mock userId for demonstration; replace with actual user session ID
    const userId = req.user?.userId || "mockUserId";

    // Save the link in the database
    const link = new Link({
      hash,
      userId,
    });

    await link.save();

    const shareableLink = `${req.protocol}://${req.get(
      "host"
    )}/users/brain/${hash}`;

    res.status(200).json({
      link: shareableLink,
    });
  } catch (error) {
    console.error("Error creating shareable link:", error);
    res
      .status(500)
      .json({ error: "Server error. Could not create shareable link." });
  }
};

export const getsharelinkdata = async (req: any, res: any, next: any) => {
  try {
    const hash = req.params.shareLink;
    console.log(hash);
    const link = await Link.findOne({ hash });
    const content = await Content.find({ userId: link?.userId });
    console.log(content);

    res.json({ message: "data", content });
  } catch (error) {
    console.error("Error fetching share link data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
