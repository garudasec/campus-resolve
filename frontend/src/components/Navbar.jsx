import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const studentLinks = [
    { label: "Dashboard", path: "/student/dashboard" },
    { label: "Create Issue", path: "/student/create-issue" },
    { label: "My Issues", path: "/student/my-issues" },
];

const adminLinks = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Manage Issues", path: "/admin/dashboard#issues" },
];

const Navbar = () => {
    const { user, token, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const links = user?.role === "admin" ? adminLinks : studentLinks;

    const handleLogout = () => {
        setMobileOpen(false);
        logout();
        navigate("/login");
    };

    const isActive = (path) => {
        if (path.includes("#")) {
            return location.pathname + location.hash === path;
        }
        return location.pathname === path && !location.hash;
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 no-underline shrink-0">

                    <span className="font-bold text-slate-900 text-lg">
                        Campus<span className="text-indigo-600">Resolve</span>
                    </span>
                </Link>

                {token && user ? (
                    <>
                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
                            {links.map(({ label, path }) => (
                                <Link
                                    key={label}
                                    to={path}
                                    className={`text-sm font-medium transition-colors no-underline ${
                                        isActive(path) ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"
                                    }`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Right Side */}
                        <div className="hidden md:flex items-center gap-5 shrink-0">
                            <div className="flex items-center gap-3 border-r border-slate-200 pr-5">
                                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                                    <span className="text-white text-xs font-bold">
                                        {user?.name?.charAt(0)?.toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-800 leading-tight">{user?.name}</p>
                                    <p className="text-xs text-slate-500 capitalize leading-tight">{user?.role}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                            >
                                Logout
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shrink-0"
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileOpen ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </>
                ) : (
                    /* Guest Links */
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link to="/" className="hidden sm:block px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors no-underline">
                            Home
                        </Link>
                        <Link to="/login" className="px-3 sm:px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors no-underline">
                            Login
                        </Link>
                        <Link to="/register" className="btn-primary text-sm no-underline px-4 py-2 rounded-lg">
                            Register
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {token && user && mobileOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-2">
                    <div className="flex items-center gap-3 px-2 pb-3 mb-2 border-b border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                            <span className="text-white text-sm font-bold">
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                            <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                        </div>
                    </div>
                    
                    {links.map(({ label, path }) => (
                        <Link
                            key={label}
                            to={path}
                            onClick={() => setMobileOpen(false)}
                            className={`block px-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-colors ${
                                isActive(path) ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                    
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2.5 mt-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;