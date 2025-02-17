import Head from "next/head";
import styles from "../styles/Home.module.css";
import DynamicText from "components/DynamicText";
import { Input, Container } from "@chakra-ui/react";
import React, { useRef } from "react";
const Home = () => {
  const textRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    textRef.current?.changeValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        bgGradient={["linear(to-b, blue.200, teal.500)", "linear(to-t, orange.100, purple.300)"]}
        width={{ base: "100%", sm: "80%", md: "60%" }}
        borderRadius="lg"
        p="6"
        boxShadow="md">
        <main className={styles.main}>
          <DynamicText ref={textRef} />
          <Input variant="flushed" placeholder="random word" width="auto" onChange={onChange} />
        </main>
      </Container>
    </div>
  );
};

export default Home;
