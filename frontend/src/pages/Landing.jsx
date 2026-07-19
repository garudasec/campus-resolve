import { useNavigate } from "react-router-dom";

const features = [
    {
        title: "Raise Issues Easily",
        desc: "Submit campus issues in seconds — attendance, fine, results, infrastructure and more.",
    },
    {
        title: "Track in Real Time",
        desc: "Watch your issue move from Open → In Progress → Resolved with live status updates.",
    },
    {
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
            <section className="bg-indigo-700 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
                    <span className="inline-block mb-4 px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium text-indigo-100 border border-white/20">
                        College Capstone Project
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
                            className="px-7 py-3.5 bg-white text-indigo-700 font-bold rounded-xl shadow hover:bg-slate-50 transition-colors text-sm"
                        >
                            Get Started Free
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="px-7 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl border border-indigo-500 hover:bg-indigo-500 transition-colors text-sm"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
                <h2 className="text-2xl font-bold text-center text-slate-900 mb-3">Why CampusResolve?</h2>
                <p className="text-slate-500 text-center mb-12 text-sm">Built for students, managed by admins — simple as that.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <div key={i} className="card p-6">
                            <h3 className="font-bold text-slate-900 mb-2 text-base">{f.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

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

            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
                <h2 className="text-2xl font-bold text-center text-slate-900 mb-3">How it Works</h2>
                <p className="text-slate-500 text-center mb-12 text-sm">Four steps from problem to resolution</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step) => (
                        <div key={step.num} className="card p-6 h-full">
                            <span className="text-3xl font-black text-indigo-100">{step.num}</span>
                            <h3 className="font-bold text-slate-900 mt-2 mb-2 text-sm">{step.title}</h3>
                            <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-indigo-700 py-16 text-white text-center">
                <h2 className="text-2xl font-bold mb-3">Ready to raise your first issue?</h2>
                <p className="text-indigo-200 text-sm mb-8">Join your campus community on CampusResolve.</p>
                <button
                    onClick={() => navigate("/register")}
                    className="px-8 py-3.5 bg-white text-indigo-700 font-bold rounded-xl shadow hover:bg-slate-50 transition-colors text-sm"
                >
                    Create an Account
                </button>
            </section>
        </div>
    );
};

export default Landing;