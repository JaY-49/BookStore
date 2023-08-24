import Cookies from "js-cookie";
import { useState, createContext, useContext, useEffect } from "react";

const initialUserValue = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: "",
    role: "",
    password: "",
};

const initialState = {
    setUser: () => { },
    user: initialUserValue,
    signOut: () => { },
};

export const AuthContext = createContext(initialState);

export const AuthWrapper = ({ children }) => {

    const [userData, setUserData] = useState(initialUserValue);

    const setUser = (data) => {
        Cookies.set("userInfo", JSON.stringify(data));
        localStorage.setItem("userInfo", JSON.stringify(data))
        localStorage.setItem("userID", JSON.stringify(data.id))
        setUserData(data);
    };
    const signOut = () => {
        setUserData(initialUserValue);
        localStorage.removeItem("userInfo")
        localStorage.removeItem("userID")
        Cookies.remove("userInfo"); 
    };

    useEffect (() => {
        const data = JSON.parse(localStorage.getItem("userInfo")) || initialUserValue;

        if(!data.email){
        }
        setUserData(data);
    },[]);

    return <AuthContext.Provider value={{ setUser, user : userData, signOut }}>{children}</AuthContext.Provider>
};

export default AuthWrapper;

export const useAuthContext = () =>{
    return useContext(AuthContext)
}