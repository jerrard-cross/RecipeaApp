import React from "react";
import { Text, VStack } from "@gluestack-ui/themed";
import BaseModal from "./BaseModal";

type ConfirmModalProps = {
  title: string | "";
  isOpen: boolean;
  message: string | "";
  primary?: string | "OK";
  height?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  testIDPrimary?: string;
  testIDSecondary?: string;
  testIDTitle?: string;
  onPrimaryAction: () => void;
  secondary?: string;
  onSecondaryAction?: () => void;
};

export const ConfirmModal = function ConfirmModal(props: ConfirmModalProps) {
  return (
    <BaseModal
      testIDPrimary={props.testIDPrimary}
      testIDSecondary={props.testIDSecondary}
      testIDTitle={props.testIDTitle}
      isOpen={props.isOpen}
      title={props.title}
      primary={props.primary || "OK"}
      onPrimaryAction={props.onPrimaryAction}
      secondary={props?.secondary}
      onSecondaryAction={props?.onSecondaryAction}
    >
      <VStack py={"$2"}>
        <Text>{props.message}</Text>
      </VStack>
    </BaseModal>
  );
};

export default ConfirmModal;
