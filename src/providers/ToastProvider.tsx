import { CheckCircleIcon } from "@gluestack-ui/themed";
import {
  Icon,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import React, { useContext } from "react";

import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";

interface ToastContextState {
  setToastData: (
    showToast: boolean,
    toastOptions?: ToastOptions
  ) => void | undefined;
}
export interface ToastOptions {
  description?: string;
  title: string;
  status?: "error" | "success" | "warning" | "info" | "attention";
  duration?: number;
  placement?:
    | "top"
    | "bottom"
    | "top right"
    | "top left"
    | "bottom left"
    | "bottom right"
    | undefined;
  variant?:
    | (string & {})
    | "outline"
    | "solid"
    | "subtle"
    | "left-accent"
    | "top-accent";
  isClosable?: boolean;
  icon?: any;
}

interface renderProps {
  id: string;
}

const ToastContext = createContext<ToastContextState | undefined>(undefined);

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const toast = useToast();
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastOptions, setToastOptions] = useState<ToastOptions>({
    title: "",
    status: "info",
    duration: 3000,
    placement: "top",
    variant: "accent",
    isClosable: true,
  });

  const setToastData = (showToast: boolean, options?: ToastOptions) => {
    if (options) {
      setToastOptions({ ...options });
    }
    setIsToastVisible(showToast);
  };

  useEffect(() => {
    if (isToastVisible) {
      toast.show({
        placement: toastOptions?.placement,
        duration: toastOptions?.duration,
        avoidKeyboard: true,
        render: renderToast,
      });
    }
  }, [isToastVisible]);

  const renderToast = useCallback(
    ({ id }: renderProps) => {
      const toastId = "toast-" + id;
      return (
        <Toast
          bg={`$${toastOptions?.status}700`}
          nativeID={toastId}
          action={toastOptions?.status}
        >
          {toastOptions?.icon && (
            <Icon
              as={CheckCircleIcon}
              color="$white"
              mt="$1"
              mr="$3"
              h={"$8"}
              w={"$8"}
            />
          )}
          <VStack>
            {toastOptions?.title && (
              <ToastTitle color="$textLight50">
                {toastOptions?.title}
              </ToastTitle>
            )}
            {toastOptions?.description && (
              <ToastDescription color="$textLight50">
                {toastOptions?.description}
              </ToastDescription>
            )}
          </VStack>
        </Toast>
      );
    },
    [toastOptions]
  );

  return (
    <ToastContext.Provider
      value={{
        setToastData,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = (): ToastContextState => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastProvider;
