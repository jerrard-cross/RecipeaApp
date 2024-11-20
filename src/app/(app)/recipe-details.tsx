import React from "react";
import { useRecipeStore } from "@/src/stores";
import { observer } from "mobx-react-lite";
import { Stack } from "expo-router";
import SectionTitle from "@/src/components/SectionTitle";
import {
  Accordion,
  Image,
  ScrollView,
  StatusBar,
  VStack,
} from "@gluestack-ui/themed";

import palette from "@/src/constants/palette";
import Ingredients from "@/src/components/RecipeDetails/Ingredients";
import Directions from "@/src/components/RecipeDetails/Directions";
import RecipeInfo from "@/src/components/RecipeDetails/RecipeInfo";
import EditRecipe from "@/src/components/EditRecipe";

const RecipeDetailsScreen = observer(() => {
  const { selectedRecipe } = useRecipeStore();
  const [servings, setServings] = React.useState(selectedRecipe?.servings || 1);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Recipe",
          headerBackTitle: "Go Back",
          headerTintColor: palette.primary,
        }}
      />
      <StatusBar barStyle="dark-content" />

      <ScrollView p={"$4"} flex={1}>
        <SectionTitle title={selectedRecipe?.name || ""} />
        <Image
          source={{ uri: selectedRecipe?.image }}
          alt={selectedRecipe?.name}
          objectFit="cover"
          w={"100%"}
          h={"$48"}
          rounded={"$2xl"}
        />
        <RecipeInfo
          servings={servings}
          setServings={setServings}
          selectedRecipe={selectedRecipe}
        />
        <Accordion
          flex={1}
          type="single"
          variant="unfilled"
          defaultValue={["ingredients"]}
        >
          <Ingredients selectedRecipe={selectedRecipe} />
          <Directions selectedRecipe={selectedRecipe} />
        </Accordion>
      </ScrollView>
      <VStack mb={"$4"} justifyContent="center" alignItems="center" w="$full">
        <EditRecipe />
      </VStack>
    </>
  );
});

export default RecipeDetailsScreen;
