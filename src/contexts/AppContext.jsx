import React,{createContext,useState} from "react";

const AppContext=createContext("");
export const AppProvider=({children})=>
{
    const [isLoggedIn,setIsLoggedIn]=useState(false);

    const handleLoggedIn=()=>
    {
        setIsLoggedIn(prev=>!prev);
    }
    
    return (
        <AppContext.Provider value={{isLoggedIn,handleLoggedIn }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;