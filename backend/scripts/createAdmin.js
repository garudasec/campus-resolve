import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import connectDB from "../src/database/db.js";
import User from "../src/models/user.model.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();
        const existingAdmin = await User.findOne({
            email: "admin@krmu.edu.in",
        });

        if (existingAdmin) {
            console.log("❌ Admin already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash("AdmiN123", 10);

        await User.create({
            name: "Admin",
            email: "admin@krmu.edu.in",
            password: hashedPassword,
            rollNo: "ADMIN001",
            course: "Administration",
            semester: 1,
            role: "admin",

        });

        console.log("✅ Admin created successfully.");

    } catch (error) {
        console.error("Error:", error.message);

    } finally {
        await mongoose.connection.close();
        console.log("Database connection closed.");

    }

};

createAdmin();