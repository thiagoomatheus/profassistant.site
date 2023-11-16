"use client"

import { User } from "@/app/lib/types/types";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { firebase } from "@/app/lib/firebase/config";
import { useContext } from "react"
import { AuthContext } from "@/app/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function useAuth() {

    const { setAuth } = useContext(AuthContext)
    const router = useRouter()

    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase);

    function handleLogin(user: User) {
        if (user?.email && user.password) {
            signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in
                setAuth(true)
                router.push("/generator")
            })
            .catch((error) => {
                console.log(error.message);
            });
        }
    }

    function handleLoginGoogle() {
        signInWithPopup(auth, provider)
        .then((result) => {
            // Signed in
            setAuth(true)
        }).catch((error) => {
        });
    }

        function handleRegister(user: User) {
        const regexEmail: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
        const regexPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
        if (!user?.email || !regexEmail.test(user?.email)) { // Validando email
        
        } else if (!user.password || !regexPassword.test(user.password)) {

        }
        if (user?.email && user.password) {
            createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in 
                setAuth(true)
            })
            .catch((error) => {
                console.log(error.message);
            });
            }
    }

    function handleLogoff() {
        signOut(auth).then(() => {
            // Sign-out successful.
            setAuth(false)
        }).catch((error) => {
        // An error happened.
        })
    }

    return {
        handleLogin,
        handleLoginGoogle,
        handleRegister,
        handleLogoff
    }
}