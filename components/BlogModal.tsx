import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Image,
} from "@chakra-ui/react";
import { useEffect } from "react";

export const BlogModal = ({ content, picture, title, toggle, setToggle }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (toggle) {
      onOpen();
    }
    if (toggle) {
      setToggle(false);
    }
  }, [toggle]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={picture} />
            <Text>{content}</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" size="lg" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
