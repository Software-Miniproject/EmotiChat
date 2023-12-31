import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { storeUserData } from '../components/StoreUser';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    const logOut = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('User', currentUser);
            if (currentUser != null) {
                const { uid, email, displayName, photoURL } = currentUser;
                //console.log('User data:', { uid, email, displayName });
                storeUserData(uid, email, displayName, photoURL);
            }

        });
        return () => {
            unsubscribe();
        };
    }, []);

    // Include setUser in the context
    const contextValue = {
        googleSignIn,
        logOut,
        user,
        setUser, // Add this line
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
