import {
  Box,
  Button,
  Container,
  Text,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import React from "react";

export const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Box as="section" pb={{ base: "12", md: "24" }}>
      <Box as="nav" bg="bg-surface" boxShadow={useColorModeValue("sm", "sm-dark")}>
        <Container py={{ base: "4", lg: "5" }}>
          <HStack spacing="10" justify="space-between">
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                <Text>Welcome: {!currentUser?.email ? null : currentUser.email}</Text>
                <HStack spacing="3">
                  <Button
                    variant="outline"
                    loadingText="Submitting"
                    size="lg"
                    onClick={() => {
                      logout();
                      router.push("/log-in");
                    }}>
                    Sign out
                  </Button>
                </HStack>
              </Flex>
            ) : (
              <IconButton variant="ghost" aria-label="Open Menu" />
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Navbar;
