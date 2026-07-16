import express from "express";
import { createIssue } from "../controllers/issue.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, createIssue);

export default router;