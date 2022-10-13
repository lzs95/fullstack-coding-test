import Head from "next/head";
import styles from "../styles/Home.module.css";
import DynamicText from "../components/DynamicText";
import { Input } from "@chakra-ui/react";
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
      <main className={styles.main}>
        <DynamicText ref={textRef} />
        <Input variant="flushed" placeholder="random word" width="auto" onChange={onChange} />
      </main>
    </div>
  );
};

export default Home;
