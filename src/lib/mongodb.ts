import mongoose from "mongoose";

const connectMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'budget-db'
    });
    console.log('Connected to MongoDB');
  } catch (e) {
    console.log('Error connecting to MongoDB', e.message);
  }
}

export default connectMongoDB;
