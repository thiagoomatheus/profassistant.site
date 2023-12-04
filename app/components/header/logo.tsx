import Logotyope from "../../../public/images/Logo.png"
import Image from "next/image";
import Link from "next/link";

export default function Logo () {
    return (
        <Link href={"/"}>
            <Image 
                src={Logotyope} 
                alt="Question Generator" 
                className="w-16 sm:w-20 lg:w-24 xl:w-28"
            />
        </Link>
    )
}