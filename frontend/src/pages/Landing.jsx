import { useNavigate } from "react-router-dom";

const features = [
    {
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        ),
        title: "Raise Issues Easily",
        desc: "Submit campus issues in seconds — attendance, fine, results, infrastructure and more.",
    },
    {
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        ),
        title: "Track in Real Time",
        desc: "Watch your issue move from Open → In Progress → Resolved with live status updates.",
    },
    {
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        ),
        title: "Secure & Role-based",
        desc: "Students see only their issues. Admins manage everything. JWT-protected throughout.",
    },
];

const steps = [
    { num: "01", title: "Register & Login", desc: "Create your student account with your roll number and email." },
    { num: "02", title: "Raise an Issue", desc: "Describe your problem, pick a category, and submit." },
    { num: "03", title: "Admin Reviews", desc: "The admin assigns a department, priority, and remark." },
    { num: "04", title: "Issue Resolved", desc: "You get notified of the final status — tracked end to end." },
];

const categories = ["Attendance", "Fine", "Result", "Network", "Portal", "Infrastructure", "Other"];

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            {/* ── Hero ───────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white">
                {/* decorative blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full translate-y-1/3 -translate-x-1/4" />

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
                    <span className="inline-block mb-4 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-indigo-100 border border-white/20">
                        🎓 College Capstone Project
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        Campus issues,
                        <br />
                        <span className="text-indigo-200">resolved faster.</span>
                    </h1>
                    <p className="text-lg text-indigo-200 max-w-xl mx-auto mb-10 leading-relaxed">
                        A streamlined platform for students to raise campus complaints and for admins to track and resolve them — end to end.
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <button
                            onClick={() => navigate("/register")}
                            className="px-7 py-3.5 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
                        >
                            Get Started Free
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="px-7 py-3.5 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 transition-all text-sm"
                        >
                            Login →
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Features ────────────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
                <h2 className="text-2xl font-bold text-center text-slate-900 mb-3">Why CampusResolve?</h2>
                <p className="text-slate-500 text-center mb-12 text-sm">Built for students, managed by admins — simple as that.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <div key={i} className="card p-6 hover:-translate-y-1 transition-transform duration-200">
                            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {f.icon}
                                </svg>
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2 text-base">{f.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Categories ──────────────────────────────────────── */}
            <section className="bg-white border-y border-slate-100 py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Issue Categories</h2>
                    <p className="text-slate-500 text-sm mb-10">Raise issues across 7 campus departments</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <span
                                key={cat}
                                className="px-5 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium border border-indigo-100"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How it Works ────────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
                <h2 className="text-2xl font-bold text-center text-slate-900 mb-3">How it Works</h2>
                <p className="text-slate-500 text-center mb-12 text-sm">Four steps from problem to resolution</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step) => (
                        <div key={step.num} className="relative">
                            <div className="card p-6 h-full">
                                <span className="text-3xl font-black text-indigo-100">{step.num}</span>
                                <h3 className="font-bold text-slate-900 mt-2 mb-2 text-sm">{step.title}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ─────────────────────────────────────────────── */}
            <section className="bg-gradient-to-r from-indigo-600 to-violet-700 py-16 text-white text-center">
                <h2 className="text-2xl font-bold mb-3">Ready to raise your first issue?</h2>
                <p className="text-indigo-200 text-sm mb-8">Join your campus community on CampusResolve.</p>
                <button
                    onClick={() => navigate("/register")}
                    className="px-8 py-3.5 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all text-sm"
                >
                    Create an Account
                </button>
            </section>
        </div>
    );
};

export default Landing;
