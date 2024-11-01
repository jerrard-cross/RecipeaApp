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
import { useAuthStore, useUIStore } from "../stores";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";
import { router } from "expo-router";
import palette from "../constants/palette";
import { useSession } from "../providers/SessionProvider";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

const Auth = observer(() => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useSession();
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleSubmit = () => {
    signIn(username, password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <FormControl p="$4" w={"$4/5"}>
        <VStack space="xl" w={"$full"} justifyContent="center">
          <Heading color={palette.primaryDark} textAlign={"center"}>
            Welcome back!
          </Heading>
          <Text textAlign={"center"}>Let's sign you in</Text>
          <VStack space="xs">
            <Input $focus-borderColor={palette.primary}>
              <InputField
                type="text"
                autoCapitalize="none"
                onChangeText={setUsername}
                placeholder="Username"
                value={username}
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Input $focus-borderColor={palette.primary}>
              <InputField
                type={showPassword ? "text" : "password"}
                onChangeText={setPassword}
                placeholder="Password"
                value={password}
              />
              <InputSlot pr="$3" onPress={handleState}>
                {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  color={palette.primary}
                />
              </InputSlot>
            </Input>
          </VStack>
          <Button
            bgColor={palette.primary}
            rounded={"$full"}
            isDisabled={username.length < 3 || password.length < 5}
            onPress={() => {
              handleSubmit();
            }}
          >
            <ButtonText color="$white">Login</ButtonText>
          </Button>

          <Button
            variant="link"
            onPress={() => {
              router.navigate("/signup");
            }}
          >
            <ButtonText color={palette.primary}>Create an account</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </TouchableWithoutFeedback>
  );
});

export default Auth;
