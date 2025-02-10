import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

// Define the interface for the User document
export interface IUser extends Document {
  username: string;
  password: string;
  providerId: string;
  provider: string;
  comparePassword(password: string): Promise<boolean>;
  generateToken(): string; // Add the method to the interface
}

// Create the schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    providerId: String, // Store OAuth provider ID
    provider: String, // Store OAuth provider
  },
  { timestamps: true }
);

// Pre-save middleware for hashing passwords
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Add a method to compare passwords
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Add a method to generate a JWT
userSchema.methods.generateToken = function (): string {
  return Jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET as string, // Ensure this is defined in your environment variables
    { expiresIn: "7d" }
  );
};

// Create and export the model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
