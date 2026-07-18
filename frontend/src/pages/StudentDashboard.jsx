import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const quickActions = [
    {
        label: "Raise New Issue",
        desc: "Submit a new campus complaint",
        path: "/student/create-issue",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 4v16m8-8H4" />
        ),
        color: "from-indigo-500 to-violet-600",
        bg: "bg-indigo-50",
        text: "text-indigo-600",
    },
    {
        label: "My Issues",
        desc: "View and track all your issues",
        path: "/student/my-issues",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        ),
        color: "from-emerald-500 to-teal-600",
        bg: "bg-emerald-50",
        text: "text-emerald-600",
    },
];

const StudentDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="page-wrapper">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white p-8 mb-8 shadow-lg">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="relative">
                    <p className="text-indigo-200 text-sm font-medium mb-1">Welcome back,</p>
                    <h1 className="text-3xl font-bold mb-1">{user?.name} 👋</h1>
                    <p className="text-indigo-300 text-sm">
                        {user?.course} · Semester {user?.semester} · Roll No: {user?.rollNo}
                    </p>
                </div>
            </div>

            {/* Quick Actions */}
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                {quickActions.map((action) => (
                    <button
                        key={action.label}
                        onClick={() => navigate(action.path)}
                        className="card p-6 text-left hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer w-full"
                    >
                        <div className={`w-12 h-12 rounded-xl ${action.bg} flex items-center justify-center mb-4`}>
                            <svg className={`w-6 h-6 ${action.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {action.icon}
                            </svg>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base mb-1">{action.label}</h3>
                        <p className="text-slate-500 text-sm">{action.desc}</p>
                    </button>
                ))}
            </div>

            {/* Info Box */}
            <div className="card p-5 flex items-start gap-4 border-l-4 border-indigo-500">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-800 mb-0.5">Reminder</p>
                    <p className="text-sm text-slate-500">You can only edit or delete an issue while its status is <span className="font-semibold text-blue-600">Open</span>. Once an admin reviews it, changes are locked.</p>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
                <button onClick={handleLogout} className="btn-danger text-sm">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default StudentDashboard;
