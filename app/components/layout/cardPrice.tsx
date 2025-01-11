import { FaCheck, FaX } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
export default function CardPrice({ title, plan, price, children, ...props }: {
    title: string
    plan: {
        id: number
        name: string
        value: string
        functionalities: {
            feature: string
            active: boolean
        }[]
        price: string;
    }
    price: string
    children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={twMerge(`grid p-3 w-60 lg:w-64 xl:w-72 h-[400px] lg:h-[470px] xl:h-[550px] rounded-xl dark:hover:shadow-slate-800 shadow-md md:hover:mt-[-5px] duration-500 md:hover:shadow-lg border border-blue dark:border`, props.className)}>
            <div className="flex flex-col gap-3 mx-auto text-center">
                <h3>{title}</h3>
                <ul className="flex flex-col gap-2 lg:gap-4">
                    {plan.functionalities.map((feature) => (
                        <li key={feature.feature} className="flex flex-row gap-2 items-center text-xs xl:text-sm text-left"><span className={`text-sm xl:text-xl ${feature.active ? "text-green-700" : "text-red-800"}`}>{feature.active ? <FaCheck /> : <FaX />}</span>{feature.feature}</li>
                        )
                    )}
                </ul>
            </div>
            <div className="flex flex-col justify-center gap-5 lg:gap-10 items-center">
                <p className="flex flex-row items-center justify-center text-3xl lg:text-4xl xl:text-5xl font-bold gap-2 text-orange"><span className="font-normal text-sm">R$</span>{price}<span className="font-normal text-sm">/mês</span></p>
                {children}
            </div>
        </div>
    )
}