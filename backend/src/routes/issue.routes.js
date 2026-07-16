import express from "express";
import {
    createIssue,
    getMyIssues,
    getIssueById,
    updateIssue,
    deleteIssue,
    getAllIssues,
    updateIssueStatus,
} from "../controllers/issue.controller.js";

import { auth } from "../middleware/auth.middleware.js";
import authorizeAdmin from "../middleware/role.middleware.js";

const router = express.Router();

// Student Routes
router.post("/", auth, createIssue);
router.get("/my-issues", auth, getMyIssues);
router.get("/:id", auth, getIssueById);
router.put("/:id", auth, updateIssue);
router.delete("/:id", auth, deleteIssue);

// Admin Routes
router.get("/", auth, authorizeAdmin, getAllIssues);
router.patch("/:id/status", auth, authorizeAdmin, updateIssueStatus);

// server endpoint me GET /api/issues sirf admin kar payga agar student hit karega toh 403 Forbidden error throw hoga
export default router;
