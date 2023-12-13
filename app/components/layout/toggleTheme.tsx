// "use client"

// import { FaSun } from "react-icons/fa6";
// import { MdDarkMode } from "react-icons/md";
// import useTheme from "@/app/lib/theme/useTheme";
// import { useEffect } from "react";


// export default function ToggleTheme () {

//     useEffect(() => {
//         verifyTheme()  
//     },[])
    
//     const { handleDarkTheme, verifyTheme, darkTheme, setDarkTheme } = useTheme()

//     return (
//         <div onClick={() => {
//             setDarkTheme(!darkTheme)
//             handleDarkTheme(darkTheme)
//         }} className="w-4/5 p-2 mx-auto border flex flex-row justify-between items-center gap-2 cursor-">
//             <span className={darkTheme === true ? "bg-black" : ""}>
//                 <MdDarkMode />
//             </span>
//             <span className={darkTheme === false ? "bg-black" : ""}>
//                 <FaSun />
//             </span>
//         </div>
//     )
// }