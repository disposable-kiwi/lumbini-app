import { createContext, useState } from "react";

export const AuthContext = createContext({
    isAuth:null,
    setAuth:()=>{}
});

export const AuthProvider = ({children})=>{
    const [isAuth, setAuth] = useState(false);
    const value = {isAuth, setAuth};

    return(
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};