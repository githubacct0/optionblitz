import React, { useState, createContext } from "react";


export const AuthContext = createContext({});

const AuthContextProvider = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const handleSignin = () => {
        setIsAuth(true);
    };

    const handleSignout = () => {
        setIsAuth(false);
    }

    return (
        <AuthContext.Provider value={{ handleSignin, handleSignout, isAuth, }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;