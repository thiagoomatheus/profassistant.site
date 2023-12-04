import Image from "next/image"
import Button from "./button"

export default function Card({ title, children, img, price, aditionalCSS }: {
    title: string,
    children: React.ReactNode,
    img?: string,
    price?: string,
    aditionalCSS?: string
}) {
    return (
        <>
            <div className={`grid p-3 w-60 lg:w-64 xl:w-80 ${img || price ? "h-[400px] lg:h-[500px] xl:h-[570px]" : "h-48 md:h-64 xl:h-80 items-center"} rounded-xl shadow-md ${aditionalCSS} ${price ? "md:hover:mt-[-5px] duration-300 md:hover:shadow-2xl md:hover:border-b-4" : ""}`}>
                <div className="flex flex-col gap-3 mx-auto text-center">
                    <h3>{title}</h3>
                    {children}
                </div>
                {img && (
                    <Image src={img} alt={title} />
                )}
                {price && (
                    <div className="flex flex-col justify-center gap-5 lg:gap-10 items-center">
                        <p className="flex flex-row items-center justify-center text-3xl lg:text-4xl xl:text-5xl font-bold gap-2 text-orange"><span className="font-normal text-sm">R$</span>{price}<span className="font-normal text-sm">/mês</span></p>
                        <Button href="plans" text="Escolher" />
                    </div>
                )}
            </div>
        </>
    )
}