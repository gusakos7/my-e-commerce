import { createContext, useEffect, useState } from "react";
import {
  createUserDocument,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// component that wraps any component who wants
// access to the values
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      console.log(user);
      if (user) await createUserDocument(user).catch((e) => console.log(e));
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
