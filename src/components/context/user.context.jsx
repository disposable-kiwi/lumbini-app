import { createContext, useState } from "react";

export const UserContext = createContext({
    userEmail: '',
    setUserEmail:()=>{}
});

export const UserProvider = ({children})=>{
    const [userEmail, setUserEmail] = useState('');
    const value = {userEmail, setUserEmail};

    return(
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};