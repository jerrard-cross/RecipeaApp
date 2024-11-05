import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Redirect, router, Slot, Stack, Tabs } from "expo-router";
import { useAuthStore } from "@/src/stores";
import { observer } from "mobx-react-lite";
import { Feather, FontAwesome6, Ionicons, Octicons } from "@expo/vector-icons";
import { useSession } from "@/src/providers/SessionProvider";

const AppLayout = observer(() => {
  const { user } = useSession();

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
});

export default AppLayout;
