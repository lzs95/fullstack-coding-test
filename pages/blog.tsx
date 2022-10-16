import Image from "next/image";
import { Box, Center, Heading, Text, Stack, Avatar, useColorModeValue, Grid, GridItem } from "@chakra-ui/react";
import { getFirestore, collection, getDocs, onSnapshot } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function blogPostWithImage() {
  // Init db service
  const db = getFirestore();
  // Collection Ref
  const collectRef = collection(db, `blog-post`);
  const [blogPost, setblogPost] = useState([]);

  // Get collection data: returns a promise
  const getAllData = () => {
    onSnapshot(collectRef, (res) => {
      const posts = res.docs.map((post) => ({
        ...post.data(),
        id: post.id,
      }));
      setblogPost(posts);
    });
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <Navbar />
      <Center py={6}>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {blogPost.map((post) => {
            return (
              <GridItem
                key={post["id"]}
                gap={10}
                maxW={"445px"}
                boxShadow={"2xl"}
                rounded={"md"}
                p={6}
                overflow={"hidden"}>
                <Box h={"210px"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
                  <Image layout={"fill"} src={post["blog-image"]} />
                </Box>
                <Stack>
                  <Heading fontSize={"2xl"} color={"green.500"} fontFamily={"body"}>
                    {post["blog-title"]}
                  </Heading>
                  <Text color={"gray.500"} noOfLines={5}>
                    {post["blog-content"]}
                  </Text>
                </Stack>
              </GridItem>
            );
          })}
        </Grid>
      </Center>
    </>
  );
}
