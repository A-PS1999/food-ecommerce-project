import React, { useState } from 'react';

export const AuthContext = React.createContext({});

export default function AuthContextProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    )
}