import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/log-in");
    }
  }, [router, currentUser]);

  return <>{currentUser ? children : null}</>;
};

export default PrivateRoutes;
