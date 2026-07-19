import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            localStorage.removeItem("user");
            return null;
        }
    });

    const [token, setToken] = useState(
        () => localStorage.getItem("token") || "",
    );

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, setUser, token, setToken, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
