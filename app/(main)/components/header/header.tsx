import Logo from "./logo"
import Menu from "./menu"
export default function Header () {
    return (
        <header className="w-full p-3 md:px-5 lg:px-10 xl:px-14 flex flex-row gap-1 md:gap-5">
            <Logo />
            <Menu />
        </header>
    )
}