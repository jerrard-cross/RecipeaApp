import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ToastProvider from "../providers/ToastProvider";
import UIProvider from "../providers/UIProvider";
import ModalProvider from "../providers/ModalProvider";
import LoadingProvider from "../providers/LoadingProvider";
import { SessionProvider } from "../providers/SessionProvider";
import { FontAwesome } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Prevent the splash screen from auto-hiding before asset loading is complete.

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "sign-in",
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <GluestackUIProvider config={config}>
          <ModalProvider>
            <ToastProvider>
              <LoadingProvider>
                <UIProvider>
                  <SessionProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                      {}
                      <Stack.Screen
                        name="(auth)/sign-in"
                        options={{ headerShown: false }}
                      />
                    </Stack>
                  </SessionProvider>
                </UIProvider>
              </LoadingProvider>
            </ToastProvider>
          </ModalProvider>
        </GluestackUIProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
