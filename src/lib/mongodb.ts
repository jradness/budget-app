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

// import mongoose from "mongoose";
//
// declare global {
//   var _mongooseConnectionPromise: mongoose.Connection;
// }
//
// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }
//
// const uri = process.env.MONGODB_URI;
// const options = { dbName: 'budget-db' };
//
// let mongooseConnectionPromise;
//
// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable to preserve the connection
//   let globalWithMongoose = global as typeof globalThis & {
//     _mongooseConnectionPromise?: Promise<typeof mongoose>;
//   };
//
//   if (!globalWithMongoose._mongooseConnectionPromise) {
//     mongooseConnectionPromise = mongoose.connect(uri, options);
//     globalWithMongoose._mongooseConnectionPromise = mongooseConnectionPromise;
//   } else {
//     mongooseConnectionPromise = globalWithMongoose._mongooseConnectionPromise;
//   }
// } else {
//   mongooseConnectionPromise = mongoose.connect(uri, options);
// }
//
// export default mongooseConnectionPromise;

