"use client"

import { useState, createContext } from 'react';
import Notification from '../../components/notification';
import { NotificationTypes } from '../hooks/useNotification';

export const NotificationContext = createContext<React.Dispatch<React.SetStateAction<{
    message: NotificationTypes;
    type: "error" | "success";
} | undefined>>>(() => {})

export default function NotificationProvider ({ children }: {
    children: React.ReactNode
}) {

    const [notification, setNotification] = useState<{
        message: NotificationTypes,
        type: "error" | "success"
    } | undefined>(undefined)

    return (
        <NotificationContext.Provider value={setNotification}>
            {notification && (
                <Notification message={notification.message} type={notification.type} />
            )}
            {children}
        </NotificationContext.Provider>
    )
}