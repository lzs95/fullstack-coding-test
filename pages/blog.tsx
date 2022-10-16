import Image from "next/image";
import { Box, Center, Heading, Text, Stack, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { BlogModal } from "components/BlogModal";
import router from "next/router";
import { useAuth } from "context/AuthContext";

export default function blogPostWithImage() {
  const db = getFirestore();
  const { currentUser } = useAuth();
  const collectRef = collection(db, `blog-post`);
  const [blogPost, setblogPost] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [modalContent, setModalContent] = useState({ content: "", image: "", title: "" });

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

  const openModal = (blogContent, blogIimage, blogTitle) => {
    setModalContent({
      content: blogContent,
      image: blogIimage,
      title: blogTitle,
    });
    setToggle(true);
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/log-in");
      alert("Unverified User");
    } else {
      getAllData();
    }
  }, []);

  return (
    <>
      <BlogModal
        content={modalContent.content}
        picture={modalContent.image}
        title={modalContent.title}
        toggle={toggle}
        setToggle={setToggle}
      />

      <Navbar />
      <Center py={6}>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {blogPost.map((post) => {
            return (
              <GridItem
                key={post["id"]}
                transition="all 0.2s"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "md",
                }}
                gap={10}
                maxW={"445px"}
                boxShadow={"lg"}
                rounded={"md"}
                p={6}
                overflow={"hidden"}
                onClick={() => openModal(post["blog-content"], post["blog-image"], post["blog-title"])}>
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
