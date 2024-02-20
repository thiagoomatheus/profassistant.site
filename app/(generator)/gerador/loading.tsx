export default function Loading() {
    return (
        <>
            <h1 className="w-full animate-pulse bg-slate-200 h-20 rounded-lg"></h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-slate-200 w-full h-2/5 animate-pulse rounded-lg"></div>
                <div className="bg-slate-200 w-full h-2/5 animate-pulse rounded-lg"></div>
            </div>
        </>
    )
}