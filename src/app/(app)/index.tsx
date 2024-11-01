import React, { useEffect, useMemo, useState } from "react";
import { Stack } from "expo-router";
import {
  Button,
  ButtonText,
  HStack,
  VStack,
  Avatar,
  StatusBar,
  AvatarFallbackText,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverBody,
} from "@gluestack-ui/themed";
import { useAuthStore, useRecipeStore } from "@/src/stores";
import { observer } from "mobx-react-lite";
import MyRecipes from "@/src/components/MyRecipes";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions, TouchableWithoutFeedback } from "react-native";
import palette from "@/src/constants/palette";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";

import { Pressable } from "@gluestack-ui/themed";
import { useSession } from "@/src/providers/SessionProvider";
import { Menu } from "lucide-react-native";
import { ButtonIcon } from "@gluestack-ui/themed";
import { PopoverHeader } from "@gluestack-ui/themed";
import { PopoverCloseButton } from "@gluestack-ui/themed";
import RecipeTags from "@/src/components/RecipeTags";
import RecipeItems from "@/src/components/RecipeItems";

const HomeScreen = observer(() => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, user } = useSession();
  const { getRecipes, selectRecipe, recipes } = useRecipeStore();
  const width = Dimensions.get("window").width;
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const recipeTags = useMemo<string[]>(() => {
    if (!recipes) {
      return [];
    }
    return [...new Set(recipes.map((item) => item.cuisine).flat())];
  }, [recipes]);

  useEffect(() => {
    Promise.all([getRecipes()]);
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />
      <VStack space="xl" flex={1} py={"$10"} mt={"$8"}>
        <VStack gap={"$2"} px={"$4"}>
          <HStack justifyContent="space-between">
            <Avatar bgColor={palette.primary} size="md" borderRadius={"$full"}>
              <AvatarFallbackText>
                {user?.firstName} {user?.lastName}
              </AvatarFallbackText>
              <AvatarImage
                source={{ uri: user?.image }}
                alt={`${user?.firstName} ${user?.lastName}`}
              />
            </Avatar>
            <TouchableWithoutFeedback onPress={() => handleClose()}>
              <Popover
                isOpen={isOpen}
                onClose={handleClose}
                onOpen={handleOpen}
                isKeyboardDismissable={true}
                placement="left"
                size="md"
                trigger={(triggerProps) => {
                  return (
                    <Button variant="link" size="xl" {...triggerProps}>
                      <ButtonIcon as={Menu} color={palette.primaryDark} />
                    </Button>
                  );
                }}
              >
                <PopoverContent w={"$full"}>
                  <PopoverBody>
                    <Button
                      rounded={"$full"}
                      bgColor={palette.primary}
                      mt={"$2"}
                      onPress={() => {
                        signOut();
                      }}
                    >
                      <ButtonText>Log out</ButtonText>
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </TouchableWithoutFeedback>
          </HStack>

          <MyRecipes />

          <RecipeTags recipeTags={recipeTags} />
        </VStack>

        <RecipeItems selectRecipe={selectRecipe} />
      </VStack>
    </>
  );
});

export default HomeScreen;
