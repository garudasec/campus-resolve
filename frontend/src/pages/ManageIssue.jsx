import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";

const statusBadge = (status) => {
    const map = {
        "Open": "badge badge-open",
        "In Progress": "badge badge-inprogress",
        "Resolved": "badge badge-resolved",
        "Rejected": "badge badge-rejected",
    };
    return map[status] || "badge";
};

const ManageIssue = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [issue, setIssue] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get(`/issues/${id}`)
            .then((res) => setIssue(res.data.issue))
            .catch((err) => setError(err.response?.data?.message || "Failed to load issue."))
            .finally(() => setIsLoading(false));
    }, [id]);

    const handleChange = (e) => setIssue({ ...issue, [e.target.name]: e.target.value });

    const handleUpdate = async () => {
        setIsSaving(true);
        try {
            const response = await api.patch(`/issues/${id}/status`, {
                status: issue.status,
                priority: issue.priority,
                assignedDepartment: issue.assignedDepartment,
                adminRemark: issue.adminRemark,
            });
            alert(response.data.message);
            navigate("/admin/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update issue.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <Loader />;
    if (error) return (
        <div className="page-wrapper max-w-3xl">
            <div className="card p-8 text-center text-red-500">{error}</div>
        </div>
    );

    return (
        <div className="page-wrapper max-w-3xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div>
                    <h1 className="page-title">Manage Issue</h1>
                    <p className="text-slate-500 text-sm">Update status, priority, department and remark</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Issue Info */}
                <div className="lg:col-span-2 space-y-5">
                    <div className="card p-6">
                        <div className="flex items-start gap-3 mb-4">
                            <span className={statusBadge(issue.status)}>{issue.status}</span>
                            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-medium">{issue.category}</span>
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 mb-3">{issue.title}</h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-5">{issue.description}</p>
                        <div className="pt-4 border-t border-slate-100">
                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">Raised By</p>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">
                                        {issue.createdBy?.name?.charAt(0)?.toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">{issue.createdBy?.name}</p>
                                    <p className="text-xs text-slate-500">{issue.createdBy?.rollNo} · {issue.createdBy?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Controls */}
                <div className="card p-6 space-y-5 h-fit">
                    <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-3">Admin Controls</h3>

                    <div>
                        <label className="form-label">Status</label>
                        <select name="status" value={issue.status} onChange={handleChange} className="form-input">
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Priority</label>
                        <select name="priority" value={issue.priority} onChange={handleChange} className="form-input">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Department</label>
                        <select name="assignedDepartment" value={issue.assignedDepartment || ""} onChange={handleChange} className="form-input">
                            <option value="">Select Department</option>
                            <option value="Academic">Academic</option>
                            <option value="Accounts">Accounts</option>
                            <option value="Examination">Examination</option>
                            <option value="IT">IT</option>
                            <option value="Facilities">Facilities</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Admin Remark</label>
                        <textarea
                            name="adminRemark"
                            placeholder="Add a remark for the student..."
                            value={issue.adminRemark || ""}
                            onChange={handleChange}
                            className="form-input resize-none"
                            rows={3}
                        />
                    </div>

                    <button
                        onClick={handleUpdate}
                        disabled={isSaving}
                        className="btn-primary w-full py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSaving ? "Saving..." : "Update Issue"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageIssue;
