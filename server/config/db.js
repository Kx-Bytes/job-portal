import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully');
    });
    
    mongoose.connection.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`);
    });

    try {
        await mongoose.connect(`${process.env.MONGO_URI}/job-portal`);
    } catch (error) {
        console.error(`Failed to connect to MongoDB: ${error.message}`);
        process.exit(1);
    }
    
};

export default connectDB;