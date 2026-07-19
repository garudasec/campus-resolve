const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 mt-auto">
            <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                   
                    <span className="text-sm font-semibold text-slate-700">
                        Campus<span className="text-indigo-600">Resolve</span>
                    </span>
                </div>
                <p className="text-xs text-slate-500">
                    © 2026 CampusResolve · All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer; 