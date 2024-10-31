import React from "react";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Heading,
  Button,
  VStack,
  ButtonText,
  ModalBackdrop,
} from "@gluestack-ui/themed";
import { DimensionValue, Platform, StyleSheet } from "react-native";

export interface BaseModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  subTitle?: string;
  header?: string;
  message?: string;
  subMessage?: string;
  hasInput?: boolean;
  multiline?: boolean;
  inputValue?: string;
  inputHeight?: DimensionValue;
  placeholder?: string;
  primary?: string | null;
  secondary?: string;
  tertiary?: string;
  primaryDisabled?: boolean;
  secondaryDisabled?: boolean;
  tertiaryDisabled?: boolean;
  onPrimaryAction?: (value?: any) => void;
  onSecondaryAction?: () => void;
  onTertiaryAction?: () => void;
  height?: DimensionValue;
  size?: "xs" | "sm" | "md" | "lg" | "full";
  commonTestId?: string;
  testIDBody?: string;
  testIDPrimary?: string;
  testIDSecondary?: string;
  testIDTertiary?: string;
  testIDTitle?: string;
  testIDSubTitle?: string;
  scrollableDisabled?: boolean;
  showBodyPadding?: boolean;
  headerBackgroundColor?: string;
  buttonColor?: string;
  children?: React.ReactNode;
  closeOnOverlayClick?: boolean;
}

export const BaseModal: React.FC<BaseModalProps> = (props: BaseModalProps) => {
  const commonTestId = props.commonTestId ? props.commonTestId + "-" : "";

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      closeOnOverlayClick={props.closeOnOverlayClick === true ? true : false}
      avoidKeyboard={true}
      size={props.size || "sm"}
    >
      <ModalBackdrop bgColor="black" opacity={0.7} />

      <ModalContent style={{ height: props.height || "auto" }}>
        {props.title && (
          <ModalHeader
            style={styles.modalHeader}
            backgroundColor={
              props.headerBackgroundColor
                ? props.headerBackgroundColor
                : "$primary500"
            }
          >
            <VStack px={"$2"}>
              <Heading
                testID={props.testIDTitle || `${commonTestId}title`}
                accessibilityLabel={props.testIDTitle}
                size="md"
                pb={"$1"}
                color="#FFFFFF"
                textAlign={"center"}
              >
                {props.title}
              </Heading>
              {props.subTitle && (
                <Heading
                  testID={props.testIDSubTitle || `${commonTestId}subtitle`}
                  size="md"
                  sub={true}
                  textAlign={"center"}
                  color="#FFFFFF"
                >
                  {props.subTitle}
                </Heading>
              )}
            </VStack>
          </ModalHeader>
        )}

        <ModalBody
          testID={props.testIDBody || `${commonTestId}body`}
          scrollEnabled={props.scrollableDisabled !== true}
          px={props.showBodyPadding !== false ? "$3" : "$0"}
          overflow={Platform.OS === "ios" ? "hidden" : "scroll"}
        >
          {props.children}
        </ModalBody>

        {(props.primary || props.secondary || props.tertiary) && (
          <ModalFooter style={styles.footerContainer}>
            {props.secondary && (
              <Button
                accessibilityLabel={props.testIDSecondary}
                testID={
                  props.testIDSecondary || `${commonTestId}secondaryButton`
                }
                borderWidth={1}
                borderColor={props.buttonColor || "$primary500"}
                rounded={"$full"}
                backgroundColor={"$white"}
                style={styles.footerButton}
                size="sm"
                isDisabled={props.secondaryDisabled}
                onPress={props.onSecondaryAction}
              >
                <ButtonText color={props.buttonColor || "$primary500"}>
                  {props.secondary}
                </ButtonText>
              </Button>
            )}
            {props.primary && (
              <Button
                accessibilityLabel={props.testIDPrimary}
                testID={props.testIDPrimary || `${commonTestId}primaryButton`}
                rounded={"$full"}
                backgroundColor={props.buttonColor || "$primary500"}
                style={styles.footerButton}
                size="sm"
                isDisabled={props.primaryDisabled}
                onPress={props.onPrimaryAction}
              >
                <ButtonText>{props.primary}</ButtonText>
              </Button>
            )}
            {props.tertiary && (
              <Button
                rounded={"$full"}
                testID={props.testIDTertiary || `${commonTestId}tertiaryButton`}
                backgroundColor={props.buttonColor || "$primary500"}
                style={styles.footerButton}
                size="sm"
                isDisabled={props.tertiaryDisabled}
                onPress={props.onTertiaryAction}
              >
                <ButtonText>{props.tertiary}</ButtonText>
              </Button>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerButton: {
    flex: 1,
    height: 45,
    marginHorizontal: 5,
  },
  modalHeader: {
    justifyContent: "center",
  },
});

export default BaseModal;
