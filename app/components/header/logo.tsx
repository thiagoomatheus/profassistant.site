import Logotyope from "../../../public/images/Logo.png"
import Image from "next/image";
import Link from "next/link";

export default function Logo () {
    return (
        <Link href={"/"}>
            <Image 
                src={Logotyope} 
                alt="Question Generator" 
                width={96}
            />
        </Link>
    )
}