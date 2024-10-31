import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonText,
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

const AuthScreen = observer(() => {
  const { setSession, session, user } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (user) {
      router.navigate("/(app)");
    }

    if (!user) {
      router.navigate("/signin");
    }
  }, [user]);
  return (
    <View h="$full" justifyContent="center" alignItems="center" gap={"$2"}>
      <Auth />
      {user && <Text>{user.Email}</Text>}
    </View>
  );
});

export default AuthScreen;
