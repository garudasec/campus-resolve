import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "", email: "", password: "", rollNo: "", course: "", semester: "",
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
            const response = await api.post("/auth/register", formData);
            alert(response.data.message);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50 py-12">
            <div className="w-full max-w-lg">
                {/* Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 items-center justify-center shadow-lg mb-4">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
                    <p className="text-slate-500 text-sm mt-1">Student registration for CampusResolve</p>
                </div>

                <div className="card p-8">
                    {error && (
                        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                            <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">Full Name</label>
                                <input type="text" name="name" placeholder="Rahul Sharma"
                                    value={formData.name} onChange={handleChange}
                                    className="form-input" required />
                            </div>
                            <div>
                                <label className="form-label">Roll Number</label>
                                <input type="text" name="rollNo" placeholder="22CS101"
                                    value={formData.rollNo} onChange={handleChange}
                                    className="form-input" required />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Email Address</label>
                            <input type="email" name="email" placeholder="you@college.edu"
                                value={formData.email} onChange={handleChange}
                                className="form-input" required />
                        </div>

                        <div>
                            <label className="form-label">Password</label>
                            <input type="password" name="password" placeholder="Create a strong password"
                                value={formData.password} onChange={handleChange}
                                className="form-input" required />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">Course</label>
                                <input type="text" name="course" placeholder="B.Tech CSE"
                                    value={formData.course} onChange={handleChange}
                                    className="form-input" required />
                            </div>
                            <div>
                                <label className="form-label">Semester</label>
                                <input type="text" name="semester" placeholder="5th"
                                    value={formData.semester} onChange={handleChange}
                                    className="form-input" required />
                            </div>
                        </div>

                        <button type="submit" disabled={isLoading}
                            className="btn-primary w-full py-3 text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none">
                            {isLoading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-5 text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
