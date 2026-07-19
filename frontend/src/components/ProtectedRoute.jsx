import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// allowedRole: "student" | "admin"
const ProtectedRoute = ({ children, allowedRole }) => {
    const { user, token } = useContext(AuthContext);

    // Not logged in at all → go to login
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but wrong role → send to their own dashboard
    if (user.role !== allowedRole) {
        if (user.role === "admin") {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/student/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;