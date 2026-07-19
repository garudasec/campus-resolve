import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { AuthContext } from "../context/AuthContext.jsx";

import { Toast } from "../utils/toast.js";


const STUDENT_EMAIL_REGEX = /^\d{10}@krmu\.edu\.in$/;
const ADMIN_EMAIL = "admin@krmu.edu.in";


const Login = () => {
    const navigate = useNavigate();
    const { setUser, setToken } = useContext(AuthContext);

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [fieldErrors, setFieldErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    };

    const validate = () => {
        const errors = {};
        const email = formData.email.trim();

        if (email !== ADMIN_EMAIL && !STUDENT_EMAIL_REGEX.test(email)) {
            errors.email = "Enter your student email (10digitrollnumber@krmu.edu.in) or the admin email.";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            const response = await api.post("/auth/login", formData);
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setToken(token);
            setUser(user);

            Toast.fire({
                icon: "success",
                title: "Login successful"
            });

            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/student/dashboard");
            }
        } catch (err) {
            Toast.fire({
                icon: "error",
                title: err.response?.data?.message || "Login failed. Check your credentials."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 items-center justify-center shadow-lg mb-4">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
                    <p className="text-slate-500 text-sm mt-1">Sign in to your CampusResolve account</p>
                </div>

                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        <div>
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="2301010001@krmu.edu.in"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                            {fieldErrors.email && (
                                <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-3 text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-5 text-sm text-slate-500">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;