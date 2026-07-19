import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/database/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import issueRoutes from "./src/routes/issue.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
        credentials: true,
    }),
);

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

const port = process.env.PORT || 4000;

connectDB();

app.listen(port, () => {
    console.log(`Server has started on port: ${port}`);
});
