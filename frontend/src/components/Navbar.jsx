import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, token, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 no-underline">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <span className="font-bold text-slate-900 text-lg">
                        Campus<span className="text-indigo-600">Resolve</span>
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-2">
                    {!token ? (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors no-underline"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="btn-primary text-sm no-underline"
                            >
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2 mr-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">
                                        {user?.name?.charAt(0)?.toUpperCase()}
                                    </span>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-xs font-semibold text-slate-800">{user?.name}</p>
                                    <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                                </div>
                            </div>

                            <Link
                                to={user?.role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
                                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors no-underline"
                            >
                                Dashboard
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="px-3 py-2 text-sm font-medium text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
