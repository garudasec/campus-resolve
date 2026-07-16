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

export { createIssue };