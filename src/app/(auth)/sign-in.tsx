import React, { useEffect } from "react";
import { Image, View } from "@gluestack-ui/themed";
import { router } from "expo-router";

import { observer } from "mobx-react-lite";
import { useSession } from "@/src/providers/SessionProvider";
import Auth from "@/src/components/Auth/Auth";

const AuthScreen = observer(() => {
  const { user } = useSession();

  useEffect(() => {
    if (user) {
      router.navigate("/(app)");
    }
    if (!user) {
      router.navigate("/sign-in");
    }
  }, [user]);
  return (
    <View h="$full" alignItems="center" gap={"$2"} mt={"$10"}>
      <Image
        source={require("@/assets/images/recipea-logo.png")}
        alt="Recipea Logo"
        h="$56"
        w="$56"
      />
      <Auth />
    </View>
  );
});

export default AuthScreen;
