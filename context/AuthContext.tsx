import React, { useContext, useState, useEffect, createContext } from "react";
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

interface Data {
  currentUser: object | null;
  login: unknown;
  signup: unknown;
  logout: unknown;
}

const AuthContext = createContext<Data | any>({});

export function useAuth() {
  return useContext(AuthContext);
}
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log("CurrentUser", currentUser);

  const signup = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        return setCurrentUser({
          uid: currentUser.uid,
          email: currentUser.email,
        });
      } else {
        setCurrentUser(null);
      }
    });
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ setCurrentUser, currentUser, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
