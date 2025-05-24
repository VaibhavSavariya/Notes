import mongoose from "mongoose";
const uri = process.env.NEXT_PUBLIC_MONGO_URI;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
const connection = {};
export const connectDB = async () => {
  if (connection?.isConnected) {
    console.log("Using existing database connection");
    return;
  }
  try {
    const db = await mongoose.connect(uri, clientOptions);
    connection.isConnected = db.connection[0]?.readyState;
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
