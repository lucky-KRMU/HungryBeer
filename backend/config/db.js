import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hungrybeer', {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Direct connection failed: ${error.message}`);
    console.warn(`[MongoDB Info] Server will continue running. Ensure MongoDB daemon is active on port 27017.`);
  }
};

export default connectDB;
