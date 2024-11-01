import React, { useEffect, useMemo } from "react";
import { router, Stack } from "expo-router";
import {
  Button,
  ButtonText,
  HStack,
  Text,
  View,
  VStack,
  Box,
  Heading,
  LinearGradient,
  Avatar,
  FlatList,
  StatusBar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";
import { useAuthStore, useRecipeStore } from "@/src/stores";
import { observer } from "mobx-react-lite";
import MyRecipes from "@/src/components/MyRecipes";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";
import palette from "@/src/constants/palette";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";

import { Pressable } from "@gluestack-ui/themed";
import { useSession } from "@/src/providers/SessionProvider";
import { Menu } from "lucide-react-native";
import { ButtonIcon } from "@gluestack-ui/themed";

const HomeScreen = observer(() => {
  const { signOut, user } = useSession();
  const { getRecipes, selectRecipe, recipes, selectedRecipe } =
    useRecipeStore();
  const width = Dimensions.get("window").width;

  const recipeTags = useMemo<string[]>(() => {
    if (!recipes) {
      return [];
    }
    return [...new Set(recipes.map((item) => item.cuisine).flat())];
  }, [recipes]);

  useEffect(() => {
    Promise.all([getRecipes()]);
  }, []);

  useEffect(() => {
    console.log("recipes", user);
  }, [selectedRecipe]);
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />
      <VStack space="xl" flex={1} py={"$10"} mt={"$8"}>
        <VStack gap={"$2"} px={"$4"}>
          <HStack justifyContent="space-between">
            <Pressable onPress={() => signOut()}>
              <Avatar
                bgColor={palette.primary}
                size="md"
                borderRadius={"$full"}
              >
                <AvatarFallbackText>
                  {user?.firstName} {user?.lastName}
                </AvatarFallbackText>
                <AvatarImage
                  source={{ uri: user?.image }}
                  alt={`${user?.firstName} ${user?.lastName}`}
                />
              </Avatar>
            </Pressable>
            <Button
              onPress={() => router.navigate("/add-recipe")}
              variant="link"
              size="xl"
            >
              <ButtonIcon as={Menu} color={palette.primaryDark} />
            </Button>
          </HStack>

          <MyRecipes />

          <HStack gap={"$1"} flexWrap={"wrap"}>
            <FlatList
              data={recipeTags}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Button
                  bgColor="$white"
                  borderColor={palette.primaryDark}
                  borderWidth={1}
                  size={"sm"}
                  rounded={"$full"}
                  onPress={() => {}}
                >
                  <ButtonText color={palette.primaryDark}>
                    {item as string}
                  </ButtonText>
                </Button>
              )}
            />
          </HStack>
        </VStack>

        <View flex={1} h={"$full"}>
          <Carousel
            loop
            width={width}
            data={recipes}
            scrollAnimationDuration={500}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 110,
            }}
            snapEnabled={true}
            style={{
              width: width,
            }}
            onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ item }) => (
              <View flex={1} position="relative">
                <LinearGradient
                  position="absolute"
                  rounded={"$3xl"}
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  zIndex={100}
                  width="100%"
                  colors={["$transparent", "$black"]}
                  borderRadius="$md"
                  start={[1, 0]}
                  end={[1, 1]}
                  as={ExpoLinearGradient}
                ></LinearGradient>
                <VStack
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  px={"$8"}
                  py={"$8"}
                  zIndex={200}
                >
                  <Heading color={"$white"}>{item.name}</Heading>
                  <HStack gap={"$2"}>
                    <Box
                      rounded={"$full"}
                      px={"$4"}
                      py={"$2"}
                      bgColor={"rgba(0,0,0,0.5)"}
                    >
                      <Text color={"$white"}>Servings: {item.servings}</Text>
                    </Box>
                    <Box
                      rounded={"$full"}
                      px={"$4"}
                      py={"$2"}
                      bgColor={"rgba(0,0,0,0.5)"}
                    >
                      <Text color={"$white"}>{item.cookTimeMinutes} min</Text>
                    </Box>
                  </HStack>
                  <Button
                    rounded={"$full"}
                    bgColor={palette.primary}
                    onPress={() => {
                      selectRecipe(item);
                      router.navigate("/recipe-details");
                    }}
                  >
                    <ButtonText color={"$white"}>View Recipe</ButtonText>
                  </Button>
                </VStack>

                <Animated.Image
                  width={width}
                  source={{ uri: item.image }}
                  alt={item.name}
                  style={{
                    objectFit: "cover",
                    borderRadius: 30,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            )}
          />
        </View>
      </VStack>
    </>
  );
});

export default HomeScreen;
