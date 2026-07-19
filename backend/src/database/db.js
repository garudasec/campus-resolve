import dns from 'dns';
// Force Node.js to use reliable public DNS servers
dns.setServers(['1.1.1.1', '8.8.8.8']); 


import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");

  } catch (error) {
    console.log(`Failed to connect Database ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;