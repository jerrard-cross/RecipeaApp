import React from "react";
import { Redirect, Stack } from "expo-router";
import { observer } from "mobx-react-lite";
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
