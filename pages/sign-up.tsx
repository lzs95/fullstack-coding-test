import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import router from "next/router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface inputData {
  email: string;
  _password: string;
}

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();

  const [data, setData] = useState<inputData>({
    email: "",
    _password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(data.email, data._password);
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  };

  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>Sign up for FREE!</Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
          boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          borderRadius={{ base: "none", sm: "xl" }}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                required
                onChange={(e: any) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type="password"
                  required
                  onChange={(e: any) =>
                    setData({
                      ...data,
                      _password: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button variant="outline" loadingText="Submitting" size="lg" onClick={handleSignup}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>Already a user?</Text>
              <Button variant="link" colorScheme="blue" onClick={() => router.push("/log-in")}>
                Log in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
