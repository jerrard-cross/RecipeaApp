import { makeAutoObservable } from "mobx";
// import { SearchService } from './api'; // Uncomment when needed

import {
  PERMISSIONS,
  RESULTS,
  check,
  checkMultiple,
  request,
  requestMultiple,
} from "react-native-permissions";
import { Linking, Platform } from "react-native";
import { RootStore } from "./RootStore";

// const api = new SearchService(); // Uncomment when needed

export class PermissionStore {
  root: RootStore;
  isLoading = false; // Sample property, can remove

  constructor(root: RootStore) {
    this.root = root;

    // NOTE: ALL props MUST be initialized with default values in order to properly observe
    makeAutoObservable(this, undefined, { autoBind: true }); // Bind 'this' so state changes propagate properly
  }

  checkLocationPermission = async () => {
    let permission: any = "";
    if (Platform.OS === "android") {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else {
      permission =
        parseInt(Platform.Version.toString(), 10) < 13
          ? PERMISSIONS.IOS.LOCATION_ALWAYS
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    }
    return await this.requestPermission(
      permission,
      "\nPermissions required to continue.\n\nPlease, open application settings and enable Location permission\n "
    );
  };

  showPermissionModal = (message: string) => {
    const rootStore = this.root;
    this.root.showModal({
      size: "lg",
      title: "Permission Required",
      message: message,
      primary: "Settings",
      secondary: "Cancel",
      onPrimaryAction() {
        rootStore.hideModal();
        Linking.openSettings();
      },
      onSecondaryAction() {
        rootStore.hideModal();
      },
    });
  };

  requestPermission = async (permission: any, message: string) => {
    try {
      const result = await check(permission);
      if (result !== RESULTS.GRANTED) {
        let permissionState = await request(permission);
        if (
          permissionState === RESULTS.BLOCKED ||
          permissionState === RESULTS.DENIED
        ) {
          this.showPermissionModal(message);
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } catch (error) {
      console.log("Error requesting permission: ", error); // eslint-disable-line no-console
    }
  };

  requestMultiplePermissions = async (permissions: any, message: string) => {
    try {
      const result = await checkMultiple(permissions);
      if (
        result[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === RESULTS.GRANTED &&
        result[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === RESULTS.GRANTED
      ) {
        let permissionState = await requestMultiple(permissions);
        if (
          permissionState[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
            RESULTS.BLOCKED ||
          permissionState[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
            RESULTS.DENIED ||
          permissionState[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
            RESULTS.BLOCKED ||
          permissionState[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
            RESULTS.DENIED
        ) {
          this.showPermissionModal(message);
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } catch (error) {
      console.log("Error requesting permission: ", error); // eslint-disable-line no-console
    }
  };

  checkCameraPermission = async () => {
    let permission: any = "";
    if (Platform.OS === "android") {
      permission = PERMISSIONS.ANDROID.CAMERA;
    } else {
      permission = PERMISSIONS.IOS.CAMERA;
    }
    return await this.requestPermission(
      permission,
      "\nPermissions required to continue.\n\nPlease, open application settings and enable Camera permission\n "
    );
  };

  checkCameraRollPermission = async () => {
    let permission: any = "";
    if (Platform.OS === "android") {
      permission = [
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ];
    } else {
      permission = [PERMISSIONS.IOS.PHOTO_LIBRARY];
    }
    return await this.requestMultiplePermissions(
      permission,
      "\nPermissions required to continue.\n\nPlease, open application settings and enable Camera Roll permission\n "
    );
  };

  checkCameraAndRollPermission = async () => {
    return Promise.all([
      this.checkCameraPermission(),
      this.checkCameraRollPermission(),
    ]);
  };
}
