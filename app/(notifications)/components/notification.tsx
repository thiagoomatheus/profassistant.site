import { NotificationTypes } from "../lib/hooks/useNotification"

export default function Notification ({ message, type }: {
    message: NotificationTypes,
    type: "error" | "success"
}) {
    return (
        <div className={`w-2/4 h-16 p-3 text-white text-center fixed top-20 left-1/4 flex flex-col justify-center items-center rounded-xl ${type} z-50`}>
            <p>{message}</p>
        </div>
    )
}