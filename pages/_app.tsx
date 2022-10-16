import React from "react";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import AuthContextProvider from "../context/AuthContext";
import "../config/firebase";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
