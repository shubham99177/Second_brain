import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Tag = mongoose.model("Tag", tagSchema);
