import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonText,
  Image,
  Input,
  InputField,
  Text,
  View,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import Auth from "@/src/components/Auth";
import { supabase } from "@/src/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useAuthStore } from "@/src/stores";
import { observer } from "mobx-react-lite";
import { useSession } from "@/src/providers/SessionProvider";

const AuthScreen = observer(() => {
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      router.navigate("/(app)");
    }
    if (!session) {
      router.navigate("/sign-in");
    }
  }, [session]);
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
