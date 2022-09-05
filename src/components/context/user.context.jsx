import { createContext, useState } from "react";

export const UserContext = createContext({
    userEmail: '',
    setUserId:()=>{}
});

export const UserProvider = ({children})=>{
    const [userEmail, setUserId] = useState('');
    const value = {userEmail, setUserId};

    return(
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};