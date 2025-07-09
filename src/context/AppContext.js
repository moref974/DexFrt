import { createContext, useContext, useState } from "react";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [otherStuff, setOtherStuff] = useState("");
  const [signer, setSigner] = useState(null);
  const [dexContract, setDexContract] = useState(null);
  return(
    <AppContext.Provider 
    value={{
    setToken,
    token,
    signer,
    setSigner,
    dexContract,
    setDexContract,
    selectedTier,
    setSelectedTier,
    otherStuff,
    setOtherStuff
    }}
    >{children}</AppContext.Provider>
  )
};

export const useAppContext = ()=> useContext(AppContext)