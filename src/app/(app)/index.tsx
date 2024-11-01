import React, { useEffect, useMemo } from "react";
import { Stack } from "expo-router";
import { VStack, StatusBar } from "@gluestack-ui/themed";
import { useRecipeStore } from "@/src/stores";
import { observer } from "mobx-react-lite";
import MyRecipes from "@/src/components/MyRecipes";

import RecipeTags from "@/src/components/RecipeTags";
import RecipeItems from "@/src/components/RecipeItems";
import AuthHeader from "@/src/components/AuthHeader";

const HomeScreen = observer(() => {
  const { getRecipes, selectRecipe, recipes } = useRecipeStore();

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
          <AuthHeader />
          <MyRecipes />
          <RecipeTags recipeTags={recipeTags} />
        </VStack>

        <RecipeItems selectRecipe={selectRecipe} />
      </VStack>
    </>
  );
});

export default HomeScreen;
