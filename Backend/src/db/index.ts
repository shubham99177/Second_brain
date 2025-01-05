import mongoose from "mongoose";

async function Connectdb() {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/second-brainly"
    );
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default Connectdb;
