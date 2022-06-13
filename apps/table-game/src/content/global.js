import { useState, createContext } from "react";

const useUserData = () => {
    const [userData, setuserData] = useState({})
    const isLogin = () => Object.keys(userData).length > 0
    const setLogin = (data) => setuserData(data)
    const setLogout = () => setuserData({})
    return {
        userData,
        isLogin,
        setLogin,
        setLogout
    }
}

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
    const userSystem = useUserData();
    return (
        <GlobalContext.Provider value={{
            userSystem,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}