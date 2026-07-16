import Issue from "../models/issue.model.js";

const createIssue = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // Validation
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, Description and Category are required.",
      });
    }

    // Create Issue
    const issue = await Issue.create({
      title,
      description,
      category,
      createdBy: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Issue created successfully.",
      issue,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


const getMyIssues = async (req, res) => {
    try {
        const userId = req.user.userId;

        const issues = await Issue.find({
            createdBy: userId
        });

        return res.status(200).json({
            success: true,
            count: issues.length,
            issues
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });

    }
};

const getIssueById = async (req, res) => {
    try {

        const { id } = req.params;

        // find Issue
        const issue = await Issue.findById(id);

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found."
            });
        }

        // ownership check
        if (issue.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "Access denied."
            });
        }

        return res.status(200).json({
            success: true,
            issue
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });

    }
};

const updateIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    // Find Issue
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    // Ownership Check
    if (issue.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    // Student can update only if issue is Open
    if (issue.status !== "Open") {
      return res.status(400).json({
        success: false,
        message: "Issue cannot be updated once it is under review or resolved.",
      });
    }

    // Update only allowed fields
    issue.title = title || issue.title;
    issue.description = description || issue.description;
    issue.category = category || issue.category;

    await issue.save();  // coz phle issue fetch kar rhe hai kyuki hume phle check karna hai issue exist karta hai? student owner h? status open h? uske bad hi update karna hai

    return res.status(200).json({
      success: true,
      message: "Issue updated successfully.",
      issue,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// Student sirf apna hi issue delete kar sakta hai, aur sirf tab jab issue ka status Open ho. Agar admin ne issue ko In Progress, Resolved, ya Rejected kar diya hai, to deletion allowed nahi hai
const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;

    // Find Issue
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    // Ownership Check
    if (issue.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    // Student can delete only if issue is Open
    if (issue.status !== "Open") {
      return res.status(400).json({
        success: false,
        message: "Issue cannot be deleted once it is under review or resolved.",
      });
    }

    // Delete Issue
    await Issue.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Issue deleted successfully.",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });

  }
};



const getAllIssues = async (req, res) => {
  try {

    const issues = await Issue.find()
      .populate("createdBy", "name email rollNo") // yaha populate bhot power hai without populate createdby me admin ko sirf objectId show hoti, but with populate id, name ,email and rollNo ye sab show hoga
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: issues.length,
      issues,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });

  }
};


const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority, assignedDepartment, adminRemark } = req.body;

    // Find Issue
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    // Check if at least one field is provided
    if (!status && !priority && !assignedDepartment && !adminRemark) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update.",
      });
    }

    // Update only provided fields
    if (status) {
      issue.status = status;
    }

    if (priority) {
      issue.priority = priority;
    }

    if (assignedDepartment) {
      issue.assignedDepartment = assignedDepartment;
    }

    if (adminRemark) {
      issue.adminRemark = adminRemark;
    }

    await issue.save();

    return res.status(200).json({
      success: true,
      message: "Issue updated successfully.",
      issue,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


export { createIssue, getMyIssues, getIssueById, updateIssue, deleteIssue, getAllIssues, updateIssueStatus };