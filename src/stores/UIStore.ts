import { makeAutoObservable, runInAction } from "mobx";
import { DimensionValue } from "react-native";
import { BaseModalProps } from "../components/Modals/BaseModal";
import { RootStore } from "./RootStore";
import { ToastOptions } from "../providers/ToastProvider";

// Minimum needed to call showModal()
export interface ShowModalOptions extends BaseModalProps {
  commonTestId?: string;
  dark?: boolean;
  headerBackgroundColor?: string;
  buttonColor?: string;
  title: string;
  header?: string;
  message?: string;
  subMessage?: string;
  hasInput?: boolean;
  multiline?: boolean;
  placeholder?: string;
  primary?: string;
  onPrimaryAction?: (value?: any) => void;
  secondary?: string;
  onSecondaryAction?: () => void;
  height?: DimensionValue;
  size?: "xs" | "sm" | "md" | "lg";
}

type ShowConnectionModalOptions = {
  size?: "xs" | "sm" | "md" | "lg";
  primary?: string;
  secondary?: string;
  tertiary?: string;
  onPrimary: () => void;
  onSecondary?: () => void;
  onTertiary?: () => void;
};

//////////////////////////////////////
// UI-related changes
//
export class UIStore {
  root: RootStore;
  isOnline = true;

  isToastEnabled = false;
  toastOptions!: ToastOptions;

  isLoading = false;
  loadingMessage = "";

  modalOptions!: ShowModalOptions | null;
  isModalOpened = false;

  constructor(root: RootStore) {
    makeAutoObservable(this, undefined, { autoBind: true }); // Bind 'this' so state changes propagate properly
    this.root = root;
  }

  setOnlineStatus(value: boolean) {
    this.isOnline = value;
  }

  showToast(options: ToastOptions) {
    this.toastOptions = options;
    this.isToastEnabled = true;
  }

  hideToast() {
    this.isToastEnabled = false;
  }

  // Wraps async function (API Calls) inside loading indicator. Shows/hides as needed
  showLoading(message = "", codeBlock?: () => Promise<any>) {
    if (__DEV__) {
      console.log(`showLoading: ${message}`); // eslint-disable-line no-console
    }
    this.isLoading = false; // Hide first, just in case.

    this.loadingMessage = message;
    this.isLoading = true;

    return codeBlock?.()
      .then(() => {
        runInAction(() => {
          this.isLoading = false;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  hideLoading() {
    this.isLoading = false;
  }

  setLoadingMessage(message = "") {
    if (__DEV__) {
      console.log(`setLoadingMessage: ${message}`); // eslint-disable-line no-console
    }

    this.loadingMessage = message;
  }

  showModal(options: ShowModalOptions) {
    // Implement sane defaults
    if (options.primary === undefined) {
      // false disables OK button
      options.primary = "OK";
      if (options.onPrimaryAction === undefined) {
        options.onPrimaryAction = () => {
          this.hideModal();
        };
      }
    }
    if (options.dark) {
      options.headerBackgroundColor = "$primary800";
      options.buttonColor = "$primary800";
    }
    this.modalOptions = options;
    this.isModalOpened = true;
  }

  hideModal() {
    if (this.modalOptions) {
      this.isModalOpened = false;
    }
  }
}
