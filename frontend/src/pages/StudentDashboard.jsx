import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Toast } from "../utils/toast";

const quickActions = [
    {
        label: "Raise New Issue",
        desc: "Submit a new campus complaint",
        path: "/student/create-issue",
    },
    {
        label: "My Issues",
        desc: "View and track all your issues",
        path: "/student/my-issues",
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case "Open": return "bg-amber-100 text-amber-800";
        case "In Progress": return "bg-blue-100 text-blue-800";
        case "Resolved": return "bg-emerald-100 text-emerald-800";
        case "Rejected": return "bg-red-100 text-red-800";
        default: return "bg-slate-100 text-slate-800";
    }
};

const StudentDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get("/issues/my-issues")
            .then((res) => setIssues(res.data.issues || []))
            .catch(() => {
                Toast.fire({
                    icon: "error",
                    title: "Failed to load dashboard data"
                });
                setIssues([]);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const stats = {
        total: issues.length,
        open: issues.filter((i) => i.status === "Open").length,
        inProgress: issues.filter((i) => i.status === "In Progress").length,
        resolved: issues.filter((i) => i.status === "Resolved").length,
        rejected: issues.filter((i) => i.status === "Rejected").length,
    };

    const recentIssues = [...issues]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

    return (
        <div className="page-wrapper">
            {/* Welcome Banner */}
            <div className="rounded-2xl bg-indigo-700 text-white p-8 mb-8 shadow-sm">
                <p className="text-indigo-200 text-sm font-medium mb-1">Welcome back,</p>
                <h1 className="text-3xl font-bold mb-1">{user?.name}</h1>
                <p className="text-indigo-200 text-sm">
                    {user?.course} · Semester {user?.semester} · Roll No: {user?.rollNo}
                </p>
            </div>

            {/* Stats */}
            {isLoading ? (
                <div className="flex justify-center items-center py-10 mb-10">
                    <span className="text-slate-500 text-sm">Loading dashboard...</span>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                    <div className="card p-5 bg-slate-50">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Issues</p>
                        <p className="text-3xl font-black text-slate-700">{stats.total}</p>
                    </div>
                    <div className="card p-5 bg-amber-50">
                        <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">Open</p>
                        <p className="text-3xl font-black text-amber-700">{stats.open}</p>
                    </div>
                    <div className="card p-5 bg-blue-50">
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">In Progress</p>
                        <p className="text-3xl font-black text-blue-700">{stats.inProgress}</p>
                    </div>
                    <div className="card p-5 bg-emerald-50">
                        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2">Resolved</p>
                        <p className="text-3xl font-black text-emerald-700">{stats.resolved}</p>
                    </div>
                    <div className="card p-5 bg-red-50">
                        <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">Rejected</p>
                        <p className="text-3xl font-black text-red-700">{stats.rejected}</p>
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                {quickActions.map((action) => (
                    <button
                        key={action.label}
                        onClick={() => navigate(action.path)}
                        className="card p-6 text-left hover:bg-slate-50 transition-colors cursor-pointer w-full"
                    >
                        <h3 className="font-bold text-slate-900 text-base mb-1">{action.label}</h3>
                        <p className="text-slate-500 text-sm">{action.desc}</p>
                    </button>
                ))}
            </div>

            {/* Recent Issues */}
            {!isLoading && issues.length > 0 && (
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Recent Issues</h2>
                        <Link
                            to="/student/my-issues"
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 no-underline"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="card divide-y divide-slate-100">
                        {recentIssues.map((issue) => (
                            <Link
                                key={issue._id}
                                to={`/student/issue/${issue._id}`}
                                className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors no-underline"
                            >
                                <div className="min-w-0 flex items-center gap-3">
                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full shrink-0 ${getStatusColor(issue.status)}`}>
                                        {issue.status}
                                    </span>
                                    <span className="font-medium text-slate-800 text-sm truncate">{issue.title}</span>
                                </div>
                                <span className="text-xs text-slate-400 shrink-0">{formatDate(issue.createdAt)}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Info Box */}
            <div className="card p-5 border-l-4 border-indigo-500 mb-8 bg-indigo-50">
                <p className="text-sm font-semibold text-slate-800 mb-1">Reminder</p>
                <p className="text-sm text-slate-600">You can only edit or delete an issue while its status is <span className="font-semibold text-blue-600">Open</span>. Once an admin reviews it, changes are locked.</p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
                <button onClick={handleLogout} className="text-sm px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default StudentDashboard;