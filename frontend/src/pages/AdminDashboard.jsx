import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";

const statusBadge = (status) => {
    const map = {
        "Open": "badge badge-open",
        "In Progress": "badge badge-inprogress",
        "Resolved": "badge badge-resolved",
        "Rejected": "badge badge-rejected",
    };
    return map[status] || "badge";
};

const priorityBadge = (priority) => {
    const map = {
        "Low": "badge badge-low",
        "Medium": "badge badge-medium",
        "High": "badge badge-high",
    };
    return map[priority] || "badge";
};

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/issues")
            .then((res) => setIssues(res.data.issues))
            .catch((err) => setError(err.response?.data?.message || "Failed to load issues."))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <Loader />;

    const stats = {
        total: issues.length,
        open: issues.filter((i) => i.status === "Open").length,
        inProgress: issues.filter((i) => i.status === "In Progress").length,
        resolved: issues.filter((i) => i.status === "Resolved").length,
    };

    return (
        <div className="page-wrapper">
            {/* Header */}
            <div className="mb-8">
                <h1 className="page-title">Admin Dashboard</h1>
                <p className="text-slate-500 text-sm mt-1">Manage and resolve all campus issues</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Issues", value: stats.total, color: "text-slate-800", bg: "bg-slate-50" },
                    { label: "Open", value: stats.open, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "In Progress", value: stats.inProgress, color: "text-amber-600", bg: "bg-amber-50" },
                    { label: "Resolved", value: stats.resolved, color: "text-emerald-600", bg: "bg-emerald-50" },
                ].map((stat) => (
                    <div key={stat.label} className={`card p-5 ${stat.bg}`}>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{stat.label}</p>
                        <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {error && (
                <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
            )}

            {/* Issues Table */}
            {issues.length === 0 && !error ? (
                <div className="card p-16 text-center">
                    <p className="text-slate-500 font-medium">No issues raised yet.</p>
                </div>
            ) : (
                <div className="card overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="font-semibold text-slate-900">All Issues</h2>
                        <span className="text-xs text-slate-500">{issues.length} total</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {issues.map((issue) => (
                            <div key={issue._id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                            <span className={statusBadge(issue.status)}>{issue.status}</span>
                                            <span className={priorityBadge(issue.priority)}>{issue.priority}</span>
                                            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                                                {issue.category}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-slate-900 text-sm truncate mb-1">{issue.title}</h3>
                                        <div className="flex items-center gap-3 text-xs text-slate-400">
                                            <span>By: <span className="text-slate-600 font-medium">{issue.createdBy?.name}</span></span>
                                            <span>·</span>
                                            <span>Roll No: <span className="text-slate-600 font-medium">{issue.createdBy?.rollNo}</span></span>
                                            <span>·</span>
                                            <span>{new Date(issue.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                                        </div>
                                    </div>
                                    <Link
                                        to={`/admin/issue/${issue._id}`}
                                        className="shrink-0 px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors no-underline"
                                    >
                                        Manage →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
