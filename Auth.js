import { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth"
import SignIn from "./components/signIn";

import { setCookie, destroyCookie } from "nookies";
const AuthContext = createContext({
    currentUser: null
});


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(null)
    useEffect(() => {
        const auth = getAuth();
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                console.log("No user ");
                setCurrentUser(null);
                setLoading(null)
                destroyCookie(null, "token");
                setCookie(null, "token", "", {});
                return
            }
            const token = await user.getIdToken();
            setCookie(null, "token", token, {});
            setCurrentUser(user)


        })
    }, [])
    if (loading) {
        return <div>Loading ......</div>
    }
    if (!currentUser) {
        return <SignIn />
    } else {
        return <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    }

}

export const useAuth = () => useContext(AuthContext)