import React, { useContext, useState, useEffect, createContext } from "react";
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

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
    auth.onAuthStateChanged((user) => {
      if (user) {
        return setCurrentUser({
          uid: user.uid,
          email: user.email,
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ setCurrentUser, currentUser, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
