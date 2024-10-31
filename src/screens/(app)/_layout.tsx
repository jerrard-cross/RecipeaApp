import { View, Text } from "react-native";
import React from "react";
import { Redirect, router, Slot, Stack, Tabs } from "expo-router";
import { useAuthStore } from "@/src/stores";
import { observer } from "mobx-react-lite";
import { Feather, FontAwesome6, Ionicons, Octicons } from "@expo/vector-icons";

export const unstable_settings = {
  initialRouteName: "(root)",
};
const AppLayout = observer(() => {
  const { user } = useAuthStore();

  if (!user) {
    return <Redirect href="/signin" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"index"} />
    </Stack>
  );
});

export default AppLayout;
