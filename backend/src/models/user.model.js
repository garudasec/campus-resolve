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

        rollNo: {
            type: String,
            required: false,
            unique: true,
        },

        course: {
            type: String,
            required: false,
        },

        semester: {
            type: String,
            required: false,
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