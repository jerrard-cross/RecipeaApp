import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import {
  Button,
  ButtonText,
  HStack,
  Text,
  View,
  VStack,
} from "@gluestack-ui/themed";
import { useAuthStore, useRecipeStore } from "@/src/stores";
import { observer } from "mobx-react-lite";
import MyRecipes from "@/src/components/MyRecipes";
import { SafeAreaView } from "react-native-safe-area-context";

const TabView = observer(() => {
  const { signOut, user } = useAuthStore();
  const { getRecipes, recipes } = useRecipeStore();

  useEffect(() => {
    if (!user) {
      router.navigate("/signin");
    } else {
      Promise.all([getRecipes(user.Id)]);
    }
  }, []);
  return (
    <VStack space="xl" p="$8">
      <MyRecipes />
      {recipes.map((recipe) => (
        <View key={recipe.id}>
          <HStack alignItems="center" gap={"$2"}>
            <VStack flex={1}>
              <Text>{recipe.name}</Text>
              <Text fontSize={"$sm"}>Servings {recipe.servings}</Text>
            </VStack>
            <Button onPress={() => {}}>
              <ButtonText>Edit</ButtonText>
            </Button>
            <Button onPress={() => {}}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </HStack>
        </View>
      ))}

      <Button
        rounded={"$full"}
        onPress={() => router.navigate("/(app)/new_recipe")}
      >
        <ButtonText>Create New Recipe</ButtonText>
      </Button>
    </VStack>
  );
});

export default TabView;
