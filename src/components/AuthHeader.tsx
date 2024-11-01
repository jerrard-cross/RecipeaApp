import React, { useState } from "react";
import {
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverBody,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import palette from "../constants/palette";
import { useSession } from "../providers/SessionProvider";
import { TouchableWithoutFeedback } from "react-native";
import { Menu } from "lucide-react-native";

const AuthHeader = () => {
  const { signOut, user } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <HStack justifyContent="space-between">
      <HStack alignItems="center">
        <Avatar bgColor={palette.primary} size="md" borderRadius={"$full"}>
          <AvatarFallbackText>
            {user?.firstName} {user?.lastName}
          </AvatarFallbackText>
          <AvatarImage
            source={{ uri: user?.image }}
            alt={`${user?.firstName} ${user?.lastName}`}
          />
        </Avatar>
        <VStack>
          <Heading size="md" color={palette.primaryDark} ml={"$2"}>
            {user?.firstName} {user?.lastName}
          </Heading>
          <Text ml={"$2"}>{user?.username}</Text>
        </VStack>
      </HStack>
      <TouchableWithoutFeedback onPress={() => handleClose()}>
        <Popover
          isOpen={isOpen}
          onClose={handleClose}
          onOpen={handleOpen}
          isKeyboardDismissable={true}
          placement="left"
          size="md"
          trigger={(triggerProps) => (
            <Button {...triggerProps} variant="link" rounded={"$full"}>
              <ButtonIcon as={Menu} color={palette.primaryDark} size="xl" />
            </Button>
          )}
        >
          <PopoverContent w={"$full"}>
            <PopoverBody>
              <Button
                rounded={"$full"}
                bgColor={palette.primary}
                mt={"$2"}
                onPress={() => {
                  signOut();
                }}
              >
                <ButtonText>Log out</ButtonText>
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </TouchableWithoutFeedback>
    </HStack>
  );
};

export default AuthHeader;
