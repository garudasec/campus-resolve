import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Toast } from "../utils/toast.js";
import { AuthContext } from "../context/AuthContext.jsx";

const STUDENT_EMAIL_REGEX = /^\d{10}@krmu\.edu\.in$/;
const ROLL_NO_REGEX = /^\d{10}$/;

const courseOptions = [
    "B.Tech CSE",
    "B.Tech CSE Full Stack",
    "B.Tech AI/ML",
    "B.Tech UI/UX",
    "B.Tech Cyber Security",
    "BCA",
    "B.Sc",
    "Other",
];

const Register = () => {
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        rollNo: "",
        course: "",
        semester: "",
    });
    const [fieldErrors, setFieldErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (token && user) {
            if (user.role === "admin") {
                navigate("/admin/dashboard", { replace: true });
            } else {
                navigate("/student/dashboard", { replace: true });
            }
        }
    }, [token, user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nextValue =
            name === "rollNo" ? value.replace(/\D/g, "").slice(0, 10) : value;

        setFormData({ ...formData, [name]: nextValue });
        setFieldErrors({ ...fieldErrors, [name]: "" });
    };

    const validate = () => {
        const errors = {};

        if (!ROLL_NO_REGEX.test(formData.rollNo)) {
            errors.rollNo = "Roll number must be exactly 10 digits.";
        }

        if (!STUDENT_EMAIL_REGEX.test(formData.email)) {
            errors.email =
                "Email must be in the format 10digitrollnumber@krmu.edu.in";
        } else {
            const emailRoll = formData.email.split("@")[0];
            if (emailRoll !== formData.rollNo) {
                errors.email = "Email roll number must match the Roll Number.";
            }
        }

        if (!formData.course) {
            errors.course = "Please select a course.";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            const response = await api.post("/auth/register", formData);
            Toast.fire({
                icon: "success",
                title: response.data.message || "Registration successful",
            });
            navigate("/login");
        } catch (err) {
            Toast.fire({
                icon: "error",
                title: err.response?.data?.message || "Registration failed.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50 py-12">
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 items-center justify-center shadow-lg mb-4">
                        <svg
                            className="w-7 h-7 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Create your account
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Student registration for CampusResolve
                    </p>
                </div>

                <div className="card p-8">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        noValidate
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Rahul Sharma"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="form-label">
                                    Roll Number
                                </label>
                                <input
                                    type="text"
                                    name="rollNo"
                                    placeholder="2301010001"
                                    inputMode="numeric"
                                    maxLength={10}
                                    value={formData.rollNo}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                                {fieldErrors.rollNo && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {fieldErrors.rollNo}
                                    </p>
                                )}
                            </div>
                        </div>

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
                                <p className="text-xs text-red-500 mt-1">
                                    {fieldErrors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">Course</label>
                                <select
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                >
                                    <option value="">Select your course</option>
                                    {courseOptions.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                                {fieldErrors.course && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {fieldErrors.course}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">Semester</label>
                                <input
                                    type="text"
                                    name="semester"
                                    placeholder="5th"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-3 text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading
                                ? "Creating account..."
                                : "Create Account"}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-5 text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
