import Login from "./login";
import Logo from "./logo";

export default function Header () {
    return (
        <header className="bg-black w-full p-5 flex flex-row justify-between">
            <Logo />
            <Login />
        </header>
    )
}