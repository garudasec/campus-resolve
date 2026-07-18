import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
    try {
        const { name, email, password, rollNo, course, semester } = req.body;

        // validation
        if (!name || !email || !password || !rollNo || !course || !semester) {
            return res.status(400).json({  // 400 - Bad request
              success: false,
              message: "All fields are required!"
            });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { rollNo }], // Agar email OR roll number me se koi bhi match hua, mujhe user de do
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(409).json({
                    message: "Email already exists",
                    success: false,
                });
            }
             if (existingUser.rollNo === rollNo) {
                return res.status(409).json({
                  success: false,
                  message: "Roll Number already exists"
                });
            }
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10)

        // create user
        await User.create({
            name,
            email,
            password: hashPassword,
            rollNo,
            course,
            semester,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully...",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error.."
        });
    }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare Password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,  // "student" or "admin" 
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    // Sending token in  Cookie
    // res.cookie("tokenCookie", token, {
    //   httpOnly: true,
    //   secure: false, 
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    // Success Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rollNo: user.rollNo,
        course: user.course,
        semester: user.semester
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { registerUser, loginUser }