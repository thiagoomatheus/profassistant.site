import AuthContextProvider from "../(login)/lib/contexts/AuthContext";
import NotificationProvider from "../(notifications)/lib/contexts/NotificationProvider";


export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NotificationProvider>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </NotificationProvider>
    )
}