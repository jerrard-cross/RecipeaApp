import {
  HStack,
  Heading,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Spinner,
} from "@gluestack-ui/themed";
import React, { useContext } from "react";

import { ReactNode, createContext, useEffect, useState } from "react";
import palette from "../constants/palette";

interface LoadingContextState {
  setLoadingData: (showLoading: boolean, message?: string) => void | undefined;
}

const LoadingContext = createContext<LoadingContextState | undefined>(
  undefined
);

const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const setLoadingData = (showLoading: boolean, message?: string) => {
    if (message) {
      setLoadingMessage(message);
    }
    setIsLoadingVisible(showLoading);
  };

  useEffect(() => {
    setLoadingData(isLoadingVisible, loadingMessage);
  }, [isLoadingVisible, loadingMessage]);

  return (
    <LoadingContext.Provider
      value={{
        setLoadingData,
      }}
    >
      {isLoadingVisible && (
        <Modal
          isOpen={isLoadingVisible}
          closeOnOverlayClick={
            __DEV__
          } /* TODO see if stalled modals is common and troubleshoot */
          onClose={() => {
            setIsLoadingVisible(false);
          }}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <HStack alignItems="center" justifyContent="center" gap={5}>
                <Spinner size="large" color={palette.primary} />
                <Heading size="sm">{loadingMessage}</Heading>
              </HStack>
            </ModalHeader>
          </ModalContent>
        </Modal>
      )}
      {children}
    </LoadingContext.Provider>
  );
};
export const useLoadingContext = (): LoadingContextState => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
};

export default LoadingProvider;
