import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../FirebaseConfig";

export const CrudContext = createContext()

export const CrudProvider = ({children}) => {
    
    const [loggedIn, setLoggedIn] = useState(false);
    const [logout, setLogout] = useState(false);

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(database, (user) => {
        setUser(user);
        setIsLoading(false);
      });

      return () => unsubscribe();
    }, []);

    return (
        <CrudContext.Provider value={{ loggedIn, setLoggedIn, logout, setLogout, user, isLoading }}>
            {children}
        </CrudContext.Provider>
    );
};

export const useCrud = () => {
    return useContext(CrudContext)
}