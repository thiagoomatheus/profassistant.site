import { ComponentProps } from "react"
export default function LabelBody({children, ...rest}: {children: React.ReactNode}& ComponentProps<"label">) {
    return <label className={`flex flex-col justify-center items-center text-[8px] md:text-xs w-24 md:w-[100px] text-center font-normal ${rest.className}`} {...rest}>
                {children}
            </label>
}

