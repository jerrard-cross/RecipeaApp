import { ReactElement, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useUIStore } from "../stores";
import { useModalContext } from "./ModalProvider";
import { useToastContext } from "./ToastProvider";
import { useLoadingContext } from "./LoadingProvider";

// Process UI events submitted through UIStore
const UIProvider = ({ children }: { children: ReactElement }) => {
  const { setToastData } = useToastContext();
  const { setLoadingData } = useLoadingContext();
  const { setModalData } = useModalContext();

  const {
    isLoading,
    loadingMessage,
    isModalOpened,
    modalOptions,
    isToastEnabled,
    toastOptions,
    hideToast,
  } = useUIStore();

  // Implement toast notifications set in MobX
  useEffect(() => {
    if (isToastEnabled) {
      setToastData(true, toastOptions);
      hideToast(); // Reset props (hopefully not TOO quick)
    } else {
      setToastData(false);
    }
  }, [isToastEnabled]);

  // Implement loading indicators
  useEffect(() => {
    if (isLoading) {
      setLoadingData(true, loadingMessage);
    } else {
      setLoadingData(false);
    }
  }, [isLoading, loadingMessage]); // May show loading, OR message may change

  // Implement modal
  useEffect(() => {
    if (isModalOpened) {
      if (modalOptions) {
        setModalData(true, modalOptions);
      }
    } else {
      setModalData(false);
    }
  }, [isModalOpened]);

  return children;
};

export default observer(UIProvider);
