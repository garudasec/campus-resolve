const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-64 gap-4" aria-label="Loading" role="status">
            <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 animate-spin"></div>
            </div>
            <p className="text-sm text-slate-500 font-medium">Loading...</p>
        </div>
    );
};

export default Loader;