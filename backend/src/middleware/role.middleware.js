/*
this is for like login to hai, but is user ko ye kam karne ki persmission nahi hai

example
student -> GET/all-issues -> not allowed
admin -> GET/all-issues -> allowed

flow

Request
   │
   ▼
Auth Middleware
(Token Verify)
   │
   ▼
req.user
{
   userId,
   role
}
   │
   ▼
Role Middleware
(Check role)
   │
   ▼
Controller

 */


const authorizeAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only.",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authorization failed",
            error: error.message,
        });
    }
};

export default authorizeAdmin;