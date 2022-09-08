import { createContext, useState } from "react";

export const UserContext = createContext({
    userId: {},
    setUser:()=>{}
});

export const UserProvider = ({children})=>{
    const [userId, setUserId] = useState({});
    const value = {userId, setUserId};

    return(
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};