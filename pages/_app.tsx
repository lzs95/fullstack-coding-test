import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import LogIn from "./log-in";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <LogIn />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
