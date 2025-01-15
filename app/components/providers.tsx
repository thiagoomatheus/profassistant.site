import AuthContextProvider from "../(login)/lib/contexts/AuthContext";
export default function Providers({ children }: { children: React.ReactNode }) {
    return <AuthContextProvider>{children}</AuthContextProvider>
}