import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";

const statusBadge = (status) => {
    const map = {
        "Open": "badge badge-open",
        "In Progress": "badge badge-inprogress",
        "Resolved": "badge badge-resolved",
        "Rejected": "badge badge-rejected",
    };
    return map[status] || "badge badge-open";
};

const MyIssues = () => {
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/issues/my-issues")
            .then((res) => setIssues(res.data.issues))
            .catch((err) => setError(err.response?.data?.message || "Failed to load issues."))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <Loader />;

    return (
        <div className="page-wrapper">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
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
                    + Raise Issue
                </button>
            </div>

            {error && (
                <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            {issues.length === 0 && !error ? (
                <div className="card p-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">No issues yet</h3>
                    <p className="text-slate-500 text-sm mb-6">You haven't raised any issues. Raise your first one!</p>
                    <button onClick={() => navigate("/student/create-issue")} className="btn-primary text-sm mx-auto">
                        Raise an Issue
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {issues.map((issue) => (
                        <div key={issue._id} className="card p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                                        <span className={statusBadge(issue.status)}>{issue.status}</span>
                                        <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                                            {issue.category}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-slate-900 text-base mb-1 truncate">{issue.title}</h3>
                                    <p className="text-xs text-slate-400">
                                        Raised on {new Date(issue.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                    </p>
                                </div>
                                <Link
                                    to={`/student/issue/${issue._id}`}
                                    className="shrink-0 px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors no-underline"
                                >
                                    View →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyIssues;
