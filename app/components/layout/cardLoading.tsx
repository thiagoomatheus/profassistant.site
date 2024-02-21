export default function CardLoading() {
    return (
        <div className="flex w-full md:justify-around flex-col md:flex-row gap-5">
            <div className="p-5 bg-slate-200 rounded-lg shadow-md w-full md:w-2/5 h-40 animate-pulse"></div>
            <div className="p-5 bg-slate-200 rounded-lg shadow-md w-full md:w-2/5 h-40 animate-pulse"></div>
        </div>
    )
}