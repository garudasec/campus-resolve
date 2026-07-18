import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import CreateIssue from "./pages/CreateIssue.jsx";
import MyIssues from "./pages/MyIssues.jsx";
import IssueDetails from "./pages/IssueDetails.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import ManageIssue from "./pages/ManageIssue.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Student routes */}
                <Route
                    path="/student/dashboard"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student/create-issue"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <CreateIssue />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student/my-issues"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <MyIssues />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student/issue/:id"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <IssueDetails />
                        </ProtectedRoute>
                    }
                />

                {/* Admin routes */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/issue/:id"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <ManageIssue />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
