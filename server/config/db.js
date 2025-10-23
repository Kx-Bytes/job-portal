import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URL not found in environment variables');
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.log('MongoDB Connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;