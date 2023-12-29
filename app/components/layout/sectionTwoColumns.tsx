import Image, { StaticImageData } from "next/image";

export default function SectionTwoColumns ({ title, text, img, borderColor, reverse }: {
    title: string,
    text: string,
    img: StaticImageData,
    borderColor: string
    reverse?: boolean
}) {
    return (
        <div className="grid grid-rows-[250px_300px] md:grid-rows-[370px] lg:grid-rows-[500px] md:grid-cols-2 md:gap-10">
          <div className="flex flex-col justify-center items-center text-center mx-auto max-w-xs md:max-w-sm xl:max-w-lg gap-10 xl:gap-14">
            <h1>{title}</h1>
            <p>{text}</p>     
          </div>
          <div className={`bg-${borderColor} w-full flex justify-center items-center p-5 rounded-xl md:rounded-2xl mx-auto max-w-md md:max-w-none ${reverse ? "md:order-first reveal-card-left" : "reveal-card-right"}`}>
            <Image src={img} alt={text} className="rounded-lg w-[250px] md:w-[300px] lg:w-[400px] xl:w-[400px]" />
          </div>
        </div>
    )
}