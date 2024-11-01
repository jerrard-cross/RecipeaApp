import { VStack, Text, Input, InputField } from "@gluestack-ui/themed";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import BaseModal, { BaseModalProps } from "../components/Modals/BaseModal";

interface ModalContextState {
  setModalData: (
    showModal: boolean,
    modalOptions?: BaseModalProps
  ) => void | undefined;
}

const ModalContext = createContext<ModalContextState | undefined>(undefined);

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpened, setModalVisible] = useState<boolean>(false);
  const [modalOptions, setModalOptions] = useState<BaseModalProps>({
    title: "",
  });
  const [inputValue, setInputValue] = useState(modalOptions.inputValue);

  const setModalData = (showModal: boolean, options?: BaseModalProps) => {
    if (options) {
      setModalOptions({ ...options });
    }
    setModalVisible(showModal);
  };

  useEffect(() => {
    setModalData(isModalOpened, modalOptions);
  }, [isModalOpened]);

  return (
    <ModalContext.Provider value={{ setModalData }}>
      <BaseModal
        headerBackgroundColor={modalOptions.headerBackgroundColor}
        buttonColor={modalOptions.buttonColor}
        isOpen={isModalOpened}
        onClose={modalOptions.onClose}
        title={modalOptions.title}
        primary={modalOptions.primary}
        secondary={modalOptions.secondary}
        tertiary={modalOptions.tertiary}
        onPrimaryAction={() => {
          modalOptions.onPrimaryAction?.(inputValue);
          setInputValue(""); // Clear value for future use
        }}
        onSecondaryAction={modalOptions.onSecondaryAction}
        onTertiaryAction={modalOptions.onTertiaryAction}
        size={modalOptions.size}
      >
        {(modalOptions.message || modalOptions.hasInput) && (
          <VStack p={"$2"}>
            {modalOptions.header && (
              <Text my={"$2"} fontWeight={"$bold"}>
                {modalOptions.header}
              </Text>
            )}
            {modalOptions.message && <Text>{modalOptions.message}</Text>}
            {modalOptions.subMessage && (
              <Text my={"$2"} fontWeight={"$semibold"}>
                {modalOptions.subMessage}
              </Text>
            )}
            {modalOptions.hasInput && (
              <Input
                p={"$2"}
                w={"100%"}
                h={
                  modalOptions.inputHeight ||
                  (modalOptions.multiline ? 100 : null)
                }
                variant="underlined"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  textAlignVertical="top"
                  defaultValue={modalOptions.inputValue}
                  multiline={modalOptions.multiline}
                  onChangeText={(text) => setInputValue(text)}
                  placeholder={modalOptions.placeholder}
                />
              </Input>
            )}
          </VStack>
        )}
      </BaseModal>

      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextState => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

export default ModalProvider;
