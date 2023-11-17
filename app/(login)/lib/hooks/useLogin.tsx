"use client"

import { User } from "@/app/lib/types/types";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { firebase } from "@/app/lib/firebase";
import { useContext } from "react"
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext";
import useNotification, { NotificationTypes } from "@/app/(notifications)/lib/hooks/useNotification";

export default function useAuth() {

    const { setAuth } = useContext(AuthContext)
    const { generateNotification } = useNotification()

    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase);

    function handleLogin(user: User) {
        if (user?.email && user.password) {
            signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in
                setAuth(true)
                generateNotification(NotificationTypes.LoginSuccess, undefined, "success")
            })
            .catch((error) => {
                generateNotification(undefined, NotificationTypes.LoginFailed, "error")
            });
        }
    }

    function handleLoginGoogle() {
        signInWithPopup(auth, provider)
        .then((result) => {
            // Signed in
            setAuth(true)
            generateNotification(NotificationTypes.LoginSuccess, undefined, "success")
        }).catch((error) => {
            generateNotification(undefined, NotificationTypes.LoginFailed, "error")
        });
    }

        function handleRegister(user: User) {
        const regexEmail: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
        const regexPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
        if (!user?.email || !regexEmail.test(user?.email)) { // Validando email
            generateNotification(undefined, NotificationTypes.EmailInvalid, "error")
        } else if (!user.password || !regexPassword.test(user.password)) {
            generateNotification(undefined, NotificationTypes.PasswordInvalid, "error")
        }
        if (user?.email && user.password) {
            createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in 
                setAuth(true)
                generateNotification(NotificationTypes.LoginSuccess)
            })
            .catch((error) => {
                generateNotification(undefined, NotificationTypes.LoginFailed, "error")
            });
            }
    }

    function handleLogout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            setAuth(false)
            generateNotification(undefined, NotificationTypes.LogoutSuccess, "error")
        }).catch((error) => {
        // An error happened.
        })
    }

    return {
        handleLogin,
        handleLoginGoogle,
        handleRegister,
        handleLogout
    }
}