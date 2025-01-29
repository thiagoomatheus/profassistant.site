import { ComponentProps } from "react"
export default function LabelBody({children, ...rest}: {children: React.ReactNode}& ComponentProps<"label">) {
    return <label className={`flex flex-col justify-center items-center text-xs md:text-sm w-24 md:w-[100px] text-center font-normal ${rest.className}`} {...rest}>
                {children}
            </label>
}

