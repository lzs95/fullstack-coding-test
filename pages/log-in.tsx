import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { PasswordField } from "../components/PasswordField";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { GoogleIcon } from "components/ProviderIcons";
import { auth } from "config/firebase";

interface inputData {
  email: string;
  _password: string;
}

const LogIn = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const { currentUser, login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<inputData>({
    email: "",
    _password: "",
  });

  const getPassword = (e) => {
    setData({
      ...data,
      _password: e.target.value,
    });
  };

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await login(data.email, data._password);
      router.push("/blog");
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  }

  const signInWithGoogle = () => {
    try {
      signInWithPopup(auth, provider);
      router.push("/blog");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>Log in to your account</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Button variant="link" colorScheme="blue" onClick={() => router.push("/sign-up")}>
                Sign up
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
          boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          borderRadius={{ base: "none", sm: "xl" }}>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
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
              <PasswordField onChange={getPassword} />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button
                variant="outline"
                loadingText="Please Wait"
                size="lg"
                onClick={(e) => handleLogin(e)}
                disabled={loading}>
                Log in
              </Button>
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <Stack spacing="6">
                <Button variant="outline" onClick={signInWithGoogle}>
                  <GoogleIcon boxSize="6" />
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default LogIn;
