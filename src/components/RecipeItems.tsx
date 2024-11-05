import {
  Box,
  Button,
  ButtonText,
  Heading,
  HStack,
  View,
  VStack,
} from "@gluestack-ui/themed";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useRecipeStore } from "../stores";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "@gluestack-ui/themed";
import Animated from "react-native-reanimated";
import palette from "../constants/palette";
import { RecipeModel } from "../models/RecipeModel";
import { router } from "expo-router";
import { observer } from "mobx-react-lite";

type RecipeItemsProps = {
  selectRecipe: (recipe: RecipeModel) => void;
};

const RecipeItems = observer(({ selectRecipe }: RecipeItemsProps) => {
  let width = Dimensions.get("window").width;
  const { filteredRecipes, getRecipes } = useRecipeStore();

  useEffect(() => {
    Promise.all([getRecipes()]);
  }, []);
  return (
    <Carousel
      loop={filteredRecipes.length > 1}
      width={width}
      data={filteredRecipes}
      scrollAnimationDuration={500}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      snapEnabled={true}
      style={{
        width: width,
      }}
      onSnapToItem={(index) => console.log("current index:", index)}
      renderItem={({ item }) => (
        <View flex={1} position="relative">
          <LinearGradient
            style={styles.gradientContainer}
            colors={["transparent", "black"]}
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
  );
});

const styles = StyleSheet.create({
  gradientContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    zIndex: 100,
    width: "100%",
  },
});

export default RecipeItems;
