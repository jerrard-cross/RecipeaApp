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
  PopoverBackdrop,
  PopoverHeader,
  Box,
} from "@gluestack-ui/themed";

import palette from "../../constants/palette";
import { useSession } from "../../providers/SessionProvider";
import LogoutConfirmationModal from "../Modals/LogoutConfirmationModal";

const AuthHeader = () => {
  const { signOut, user } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    console.log("open");
    setIsOpen(true);
  };
  const handleClose = () => {
    console.log("close");
    setIsOpen(false);
  };

  return (
    <>
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
        <Button
          rounded={"$full"}
          bgColor={palette.primary}
          mt={"$2"}
          size="sm"
          onPress={() => {
            handleOpen();
          }}
        >
          <ButtonText>Log out</ButtonText>
        </Button>
      </HStack>

      <LogoutConfirmationModal isOpen={isOpen} onClose={() => handleClose()} />
    </>
  );
};

export default AuthHeader;
