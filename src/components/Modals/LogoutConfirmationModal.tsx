import { View, Text } from "react-native";
import React from "react";
import ConfirmModal from "./ConfirmModal";
import { useSession } from "@/src/providers/SessionProvider";

type LogoutConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LogoutConfirmationModal = ({
  isOpen,
  onClose,
}: LogoutConfirmationModalProps) => {
  const { signOut } = useSession();
  return (
    <ConfirmModal
      isOpen={isOpen}
      title="Log Out"
      message="Are you sure you would like to log out?"
      onPrimaryAction={() => {
        signOut();
        onClose();
      }}
      onSecondaryAction={() => {
        onClose();
      }}
      primary="Log Out"
      secondary="Cancel"
    />
  );
};

export default LogoutConfirmationModal;
