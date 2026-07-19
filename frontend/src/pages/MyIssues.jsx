import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import { Toast } from "../utils/toast";

const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const getStatusColor = (status) => {
    switch (status) {
        case "Open": return "bg-amber-100 text-amber-800";
        case "In Progress": return "bg-blue-100 text-blue-800";
        case "Resolved": return "bg-emerald-100 text-emerald-800";
        case "Rejected": return "bg-red-100 text-red-800";
        default: return "bg-slate-100 text-slate-800";
    }
};

const MyIssues = () => {
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/issues/my-issues")
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

    return (
        <div className="page-wrapper">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
                <div>
                    <h1 className="page-title">My Issues</h1>
                    <p className="text-slate-500 text-sm mt-0.5">
                        {issues.length} issue{issues.length !== 1 ? "s" : ""} found
                    </p>
                </div>
                <button
                    onClick={() => navigate("/student/create-issue")}
                    className="btn-primary text-sm"
                >
                    Create Issue
                </button>
            </div>

            {error && (
                <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            {isLoading ? (
                <Loader />
            ) : issues.length === 0 && !error ? (
                <div className="card p-16 text-center">
                    <h3 className="font-bold text-slate-900 mb-2">No issues found</h3>
                    <p className="text-slate-500 text-sm mb-6">You haven't raised any issues. Raise your first one!</p>
                    <button onClick={() => navigate("/student/create-issue")} className="btn-primary text-sm mx-auto">
                        Create Issue
                    </button>
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="data-table-container hidden lg:block">
                        <table className="data-table w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-4 border-b">Status</th>
                                    <th className="p-4 border-b">Title</th>
                                    <th className="p-4 border-b">Category</th>
                                    <th className="p-4 border-b">Raised On</th>
                                    <th className="p-4 border-b text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issues.map((issue) => (
                                    <tr key={issue._id} className="hover:bg-slate-50 border-b last:border-0 transition-colors">
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(issue.status)}`}>
                                                {issue.status}
                                            </span>
                                        </td>
                                        <td className="p-4 font-semibold text-slate-900 max-w-xs truncate">{issue.title}</td>
                                        <td className="p-4">
                                            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                                                {issue.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-500 text-sm">{formatDate(issue.createdAt)}</td>
                                        <td className="p-4 text-right">
                                            <Link
                                                to={`/student/issue/${issue._id}`}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors no-underline"
                                            >
                                                View &rarr;
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="space-y-4 lg:hidden">
                        {issues.map((issue) => (
                            <div key={issue._id} className="card p-5 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(issue.status)}`}>
                                                {issue.status}
                                            </span>
                                            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                                                {issue.category}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-slate-900 text-base mb-1 truncate">{issue.title}</h3>
                                        <p className="text-xs text-slate-400">Raised on {formatDate(issue.createdAt)}</p>
                                    </div>
                                    <Link
                                        to={`/student/issue/${issue._id}`}
                                        className="shrink-0 px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors no-underline"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MyIssues;