import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const categories = [
    "Attendance", "Fine", "Result", "Network", "Portal", "Infrastructure", "Other",
];

const CreateIssue = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "", description: "", category: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post("/issues", formData);
            alert(response.data.message);
            navigate("/student/my-issues");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create issue.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page-wrapper max-w-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div>
                    <h1 className="page-title">Raise New Issue</h1>
                    <p className="text-slate-500 text-sm mt-0.5">Describe your problem and we'll get it resolved</p>
                </div>
            </div>

            <div className="card p-8">
                {error && (
                    <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                        <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="form-label">Issue Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Attendance not updated for Oct 15"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div>
                        <label className="form-label">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="form-input"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            placeholder="Explain your issue in detail — what happened, when, and any other relevant info..."
                            value={formData.description}
                            onChange={handleChange}
                            className="form-input resize-none"
                            rows={5}
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn-ghost flex-1 py-3 text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary flex-1 py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? "Submitting..." : "Submit Issue"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateIssue;
