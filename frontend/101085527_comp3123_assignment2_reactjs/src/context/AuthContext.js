import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if(savedToken){
            setToken(savedToken);
        }
    }, []);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    }

    const isAuthenticated = !!token;

    return(
        <AuthContext.Provider value={{token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};