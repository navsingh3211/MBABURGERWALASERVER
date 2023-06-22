import mongoose from "mongoose"

// mongoose.set("strictQuery", true);

export const connectDB = async () => {
    // const { connection } = await mongoose.connect(process.env.MONGO_URI);
    
    // console.log(`Database is connect with ${connection.host}`);
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`mongo database is connected!!! ${conn.connection.host} `);
    } catch (error) {
      console.error(`Error: ${error} `);
      process.exit(1); //passing 1 - will exit the proccess with error
    }
}