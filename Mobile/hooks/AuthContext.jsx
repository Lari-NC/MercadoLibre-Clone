import { createContext, useEffect, useContext, useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { getToken, removeToken } from "@/resources/Storage";
import Api from "@/service/Api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedToken = await getToken();
                if (storedToken) {
                    const userData = await Api.getUser();
                    setUser(userData);
                }
            } catch (error) {
                Toast.show({
                    type: "error",
                    text1: "Error restoring"
                });
            }
        };
        initializeAuth();
    }, []);

    const handleLogin = async (email, password) => {

        if (!email || email.trim() === "") {
            Toast.show({
                type: "error",
                text1: "Please enter a valid email address.",
            });
            return;
        }
    
        if (!password || password.trim() === "") {
            Toast.show({
                type: "error",
                text1: "Please enter a valid password.",
            });
            return;
        }
    
        try {
            const result = await Api.login(email, password);
            setUser(result);
            Toast.show({
                type: "success",
                text1: "Login successful",
                text2: "You have logged in successfully.",
            });
            router.push("/(tabs)/home");
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Login Error",
                text2: "There was a problem logging in. Please try again.",
            });
        }
    };
    
    const handleLogout = async () => {
        await removeToken();
        setUser(null);
        setToken("");
        router.push("/(tabs)/user");
    };

    return (
        <AuthContext.Provider value={{ user, token, handleLogout, handleLogin, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);