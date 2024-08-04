import Image from "next/image"
export default function CardImage({ title, children, img, aditionalCSS }: {
    title: string
    children: React.ReactNode
    img?: string
    aditionalCSS?: string
}) {
    return (
        <div className={`grid p-3 w-60 lg:w-64 xl:w-80 ${img ? "h-[400px] lg:h-[500px] xl:h-[570px]" : "h-48 md:h-64 xl:h-80 items-center"} rounded-xl shadow-md ${aditionalCSS}`}>
            <div className="flex flex-col gap-3 mx-auto text-center">
                <h3>{title}</h3>
                {children}
            </div>
            {img && <Image src={img} alt={title} />}
        </div>
    )
}