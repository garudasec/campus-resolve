import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";

const categories = ["Attendance", "Fine", "Result", "Network", "Portal", "Infrastructure", "Other"];

const statusBadge = (status) => {
    const map = {
        "Open": "badge badge-open",
        "In Progress": "badge badge-inprogress",
        "Resolved": "badge badge-resolved",
        "Rejected": "badge badge-rejected",
    };
    return map[status] || "badge";
};

const IssueDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [issue, setIssue] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get(`/issues/${id}`)
            .then((res) => setIssue(res.data.issue))
            .catch((err) => setError(err.response?.data?.message || "Failed to load issue."))
            .finally(() => setIsLoading(false));
    }, [id]);

    const handleChange = (e) => setIssue({ ...issue, [e.target.name]: e.target.value });

    const handleUpdate = async () => {
        try {
            const response = await api.put(`/issues/${id}`, {
                title: issue.title,
                description: issue.description,
                category: issue.category,
            });
            alert(response.data.message);
            navigate("/student/my-issues");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update issue.");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this issue?")) return;
        try {
            const response = await api.delete(`/issues/${id}`);
            alert(response.data.message);
            navigate("/student/my-issues");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete issue.");
        }
    };

    if (isLoading) return <Loader />;
    if (error) return (
        <div className="page-wrapper max-w-2xl">
            <div className="card p-8 text-center text-red-500">{error}</div>
        </div>
    );

    const isOpen = issue?.status === "Open";

    return (
        <div className="page-wrapper max-w-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="flex items-center gap-3">
                    <h1 className="page-title">Issue Details</h1>
                    <span className={statusBadge(issue.status)}>{issue.status}</span>
                </div>
            </div>

            <div className="card p-8 space-y-6">
                <div>
                    <label className="form-label">Issue Title</label>
                    <input type="text" name="title" value={issue.title}
                        onChange={handleChange} className="form-input" disabled={!isOpen} />
                </div>

                <div>
                    <label className="form-label">Category</label>
                    <select name="category" value={issue.category}
                        onChange={handleChange} className="form-input" disabled={!isOpen}>
                        {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="form-label">Description</label>
                    <textarea name="description" value={issue.description}
                        onChange={handleChange} className="form-input resize-none"
                        rows={5} disabled={!isOpen} />
                </div>

                {issue.adminRemark && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Admin Remark</p>
                        <p className="text-sm text-amber-800">{issue.adminRemark}</p>
                    </div>
                )}

                {issue.assignedDepartment && (
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium">Assigned to:</span>
                        <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">{issue.assignedDepartment}</span>
                    </div>
                )}

                {isOpen ? (
                    <div className="flex gap-3 pt-2 border-t border-slate-100">
                        <button onClick={handleDelete} className="btn-danger flex-1 py-3 text-sm">
                            Delete Issue
                        </button>
                        <button onClick={handleUpdate} className="btn-primary flex-1 py-3 text-sm">
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <div className="pt-2 border-t border-slate-100">
                        <p className="text-sm text-slate-500 text-center py-2">
                            This issue is <span className="font-semibold text-slate-700">{issue.status}</span> — editing is locked.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IssueDetails;
