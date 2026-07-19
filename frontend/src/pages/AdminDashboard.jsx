import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { Toast } from "../utils/toast";

const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

const getStatusColor = (status) => {
    switch (status) {
        case "Open": return "bg-amber-100 text-amber-800";
        case "In Progress": return "bg-blue-100 text-blue-800";
        case "Resolved": return "bg-emerald-100 text-emerald-800";
        case "Rejected": return "bg-red-100 text-red-800";
        default: return "bg-slate-100 text-slate-800";
    }
};

const getPriorityColor = (priority) => {
    switch (priority) {
        case "Low": return "bg-slate-100 text-slate-700";
        case "Medium": return "bg-blue-100 text-blue-700";
        case "High": return "bg-red-100 text-red-700";
        default: return "bg-slate-100 text-slate-700";
    }
};

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [courseFilter, setCourseFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("newest");

    useEffect(() => {
        api.get("/issues")
            .then((res) => setIssues(res.data.issues || []))
            .catch((err) => {
                const errorMessage = err.response?.data?.message || "Failed to load issues.";
                setError(errorMessage);
                Toast.fire({
                    icon: "error",
                    title: errorMessage
                });
            })
            .finally(() => setIsLoading(false));
    }, []);

    const stats = {
        total: issues.length,
        open: issues.filter((i) => i.status === "Open").length,
        inProgress: issues.filter((i) => i.status === "In Progress").length,
        resolved: issues.filter((i) => i.status === "Resolved").length,
        rejected: issues.filter((i) => i.status === "Rejected").length,
    };

    const courseOptions = useMemo(() => {
        const courses = new Set(issues.map((i) => i.createdBy?.course).filter(Boolean));
        return ["All", ...Array.from(courses)];
    }, [issues]);

    const filteredIssues = useMemo(() => {
        let result = [...issues];

        if (search.trim()) {
            const q = search.trim().toLowerCase();
            result = result.filter((i) => i.title?.toLowerCase().includes(q));
        }
        if (statusFilter !== "All") {
            result = result.filter((i) => i.status === statusFilter);
        }
        if (priorityFilter !== "All") {
            result = result.filter((i) => i.priority === priorityFilter);
        }
        if (courseFilter !== "All") {
            result = result.filter((i) => i.createdBy?.course === courseFilter);
        }

        result.sort((a, b) =>
            sortOrder === "newest"
                ? new Date(b.createdAt) - new Date(a.createdAt)
                : new Date(a.createdAt) - new Date(b.createdAt)
        );

        return result;
    }, [issues, search, statusFilter, priorityFilter, courseFilter, sortOrder]);

    const statCards = [
        { label: "Total Issues", value: stats.total, color: "text-slate-700", bg: "bg-slate-50" },
        { label: "Open", value: stats.open, color: "text-amber-700", bg: "bg-amber-50" },
        { label: "In Progress", value: stats.inProgress, color: "text-blue-700", bg: "bg-blue-50" },
        { label: "Resolved", value: stats.resolved, color: "text-emerald-700", bg: "bg-emerald-50" },
        { label: "Rejected", value: stats.rejected, color: "text-red-700", bg: "bg-red-50" },
    ];

    if (isLoading) return <Loader />;

    return (
        <div className="page-wrapper">
            {/* Header */}
            <div className="mb-8">
                <h1 className="page-title">Admin Dashboard</h1>
                <p className="text-slate-500 text-sm mt-1">
                    Manage and resolve all campus issues
                    {user?.name ? <> · Signed in as <span className="font-medium text-slate-600">{user.name}</span></> : null}
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {statCards.map(({ label, value, color, bg }) => (
                    <div key={label} className={`card p-5 ${bg}`}>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
                        <p className={`text-3xl font-black ${color}`}>{value}</p>
                    </div>
                ))}
            </div>

            {error && (
                <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Issues Section */}
            {issues.length === 0 && !error ? (
                <div className="card p-16 text-center">
                    <p className="text-slate-500 font-medium">No issues raised yet.</p>
                </div>
            ) : (
                <div id="issues" className="scroll-mt-24">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-slate-900">All Issues</h2>
                        <span className="text-xs text-slate-500">{filteredIssues.length} of {issues.length}</span>
                    </div>

                    {/* Controls */}
                    <div className="card p-4 mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        <div className="lg:col-span-2">
                            <input
                                type="text"
                                placeholder="Search by title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="form-input text-sm w-full"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="form-input text-sm"
                            aria-label="Filter by status"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="form-input text-sm"
                            aria-label="Filter by priority"
                        >
                            <option value="All">All Priorities</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="form-input text-sm"
                            aria-label="Sort issues"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                        {courseOptions.length > 1 && (
                            <select
                                value={courseFilter}
                                onChange={(e) => setCourseFilter(e.target.value)}
                                className="form-input text-sm lg:col-span-1"
                                aria-label="Filter by course"
                            >
                                {courseOptions.map((c) => (
                                    <option key={c} value={c}>{c === "All" ? "All Courses" : c}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    {filteredIssues.length === 0 ? (
                        <div className="card p-12 text-center">
                            <p className="text-slate-500 font-medium text-sm">No issues match your filters.</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop table */}
                            <div className="data-table-container hidden lg:block card overflow-hidden">
                                <table className="data-table w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50">
                                            <th className="p-4 border-b text-sm font-semibold text-slate-600">Status</th>
                                            <th className="p-4 border-b text-sm font-semibold text-slate-600">Priority</th>
                                            <th className="p-4 border-b text-sm font-semibold text-slate-600">Title</th>
                                            <th className="p-4 border-b text-sm font-semibold text-slate-600">Student</th>
                                            <th className="p-4 border-b text-sm font-semibold text-slate-600">Category</th>
                                            <th className="p-4 border-b text-sm font-semibold text-slate-600">Date</th>
                                            <th className="p-4 border-b text-sm font-semibold text-slate-600 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredIssues.map((issue) => (
                                            <tr key={issue._id} className="hover:bg-slate-50 border-b last:border-0 transition-colors">
                                                <td className="p-4">
                                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(issue.status)}`}>
                                                        {issue.status}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getPriorityColor(issue.priority)}`}>
                                                        {issue.priority}
                                                    </span>
                                                </td>
                                                <td className="p-4 font-semibold text-slate-900 max-w-xs truncate">{issue.title}</td>
                                                <td className="p-4">
                                                    <div className="text-sm text-slate-700 font-medium">{issue.createdBy?.name}</div>
                                                    <div className="text-xs text-slate-400">{issue.createdBy?.rollNo}</div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-xs text-slate-600 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                                                        {issue.category}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-slate-500 text-sm whitespace-nowrap">{formatDate(issue.createdAt)}</td>
                                                <td className="p-4 text-right">
                                                    <Link
                                                        to={`/admin/issue/${issue._id}`}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors no-underline"
                                                    >
                                                        Manage &rarr;
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile cards */}
                            <div className="space-y-4 lg:hidden">
                                {filteredIssues.map((issue) => (
                                    <div key={issue._id} className="card p-5 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(issue.status)}`}>
                                                        {issue.status}
                                                    </span>
                                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getPriorityColor(issue.priority)}`}>
                                                        {issue.priority}
                                                    </span>
                                                    <span className="text-xs text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                                                        {issue.category}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold text-slate-900 text-base mb-1 truncate">{issue.title}</h3>
                                                <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap mt-2">
                                                    <span>By: <span className="text-slate-600 font-medium">{issue.createdBy?.name}</span></span>
                                                    <span>·</span>
                                                    <span>Roll No: <span className="text-slate-600 font-medium">{issue.createdBy?.rollNo}</span></span>
                                                    <span>·</span>
                                                    <span>{formatDate(issue.createdAt)}</span>
                                                </div>
                                            </div>
                                            <Link
                                                to={`/admin/issue/${issue._id}`}
                                                className="shrink-0 px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors no-underline"
                                            >
                                                Manage
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;