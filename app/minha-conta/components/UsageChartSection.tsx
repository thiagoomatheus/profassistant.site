import { ProgressCircle } from "./ProgressCicle";
import { twMerge } from "tailwind-merge";

type UsageChartSectionProps = {
    usage: number
    limit: number
    title: string
} & React.HTMLAttributes<HTMLDivElement>

export default function UsageChartSection( { usage, limit, title, ...props }: UsageChartSectionProps ) {
    return (
        <div className={twMerge("lg:max-w-[425px] lg:w-[45%] flex flex-col justify-center items-center gap-5 border-2 border-blue-2 rounded-xl p-5 md:p-10", props.className)}>
            <h3 className="text-gray-900 dark:text-gray-50 text-center">{title}</h3>
            <ProgressCircle className="w-full flex flex-col justify-center h-32 sm:h-40" variant="info" value={usage} max={limit} radius={16} strokeWidth={4}>
                <p className="font-bold text-gray-900 dark:text-gray-50">
                    {Math.round((usage / limit * 100))}%
                </p>
            </ProgressCircle>
        </div>
    )
}