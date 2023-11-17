import { NotificationTypes } from "../lib/hooks/useNotification"

export default function Notification ({ message, type }: {
    message: NotificationTypes,
    type: "error" | "success"
}) {
    return (
        <div className={`w-2/4 h-16 text-white fixed top-20 left-1/4 flex flex-col justify-center items-center rounded-xl ${type}`}>
            {message}
        </div>
    )
}