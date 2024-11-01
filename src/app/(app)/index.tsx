import React, { useEffect, useMemo } from "react";
import { router, Stack } from "expo-router";
import {
  Button,
  ButtonText,
  HStack,
  Image,
  Text,
  View,
  VStack,
  Box,
  Heading,
  SafeAreaView,
  LinearGradient,
  Avatar,
  FlatList,
} from "@gluestack-ui/themed";
import { useAuthStore, useRecipeStore } from "@/src/stores";
import { observer } from "mobx-react-lite";
import MyRecipes from "@/src/components/MyRecipes";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";
import palette from "@/src/constants/palette";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import Animated, {
  SharedTransition,
  SharedTransitionType,
  withSpring,
} from "react-native-reanimated";
import { Pressable } from "@gluestack-ui/themed";

const HomeScreen = observer(() => {
  const { signOut, user } = useAuthStore();
  const { getRecipes, selectRecipe, recipes, selectedRecipe } =
    useRecipeStore();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const recipeTags = useMemo<string[]>(() => {
    if (!recipes) {
      return [];
    }
    return [...new Set(recipes.map((item) => item.cuisine).flat())];
  }, [recipes]);

  const transition = SharedTransition.custom((values) => {
    "worklet";
    return {
      height: withSpring(values.targetHeight),
      width: withSpring(values.targetWidth),
    };
  })
    .progressAnimation((values, progress) => {
      "worklet";
      const getValue = (
        progress: number,
        target: number,
        current: number
      ): number => {
        return progress * (target - current) + current;
      };
      return {
        width: getValue(progress, values.targetWidth, values.currentWidth),
        height: getValue(progress, values.targetHeight, values.currentHeight),
      };
    })
    .defaultTransitionType(SharedTransitionType.ANIMATION);

  useEffect(() => {
    Promise.all([getRecipes()]);
  }, []);

  useEffect(() => {
    console.log("recipes", selectedRecipe);
  }, [selectedRecipe]);
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <VStack space="xl" flex={1} py={"$10"}>
        <VStack gap={"$2"} px={"$4"}>
          <Avatar />

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
