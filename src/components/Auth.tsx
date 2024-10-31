import {
  EyeIcon,
  EyeOffIcon,
  FormControl,
  Heading,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  MailIcon,
  VStack,
  Text,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { useAuthStore } from "../stores";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";
import { router } from "expo-router";

const Auth = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signInWithEmail } = useAuthStore();
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleSubmit = () => {
    signInWithEmail(email, password);
  };

  return <></>;
});

export default Auth;
