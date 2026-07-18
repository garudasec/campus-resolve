import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        // here will use sparse: true, true allows multiple documents to have null rollNo
        rollNo: {
            type: String,
            sparse: true,
            unique: true,

        },

        course: {
            type: String
        },

        semester: {
            type: String,
        },

        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student",
        },
    }, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;