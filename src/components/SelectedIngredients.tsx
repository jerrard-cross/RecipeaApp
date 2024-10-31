import React from "react";
import { Box, Text } from "@gluestack-ui/themed";
import { SelectedIngredient } from "../lib/types";

interface SelectedIngredientsProps {
  ingredients: SelectedIngredient[];
}

export const SelectedIngredients: React.FC<SelectedIngredientsProps> = ({
  ingredients,
}) => {
  if (ingredients.length === 0) return null;

  return (
    <Box
      marginTop="$4"
      padding="$4"
      borderRadius="$md"
      borderWidth="$1"
      borderColor="$borderLight300"
    >
      <Text size="lg" fontWeight="$bold" marginBottom="$2">
        Selected Ingredients
      </Text>
      {ingredients.map((ingredient) => (
        <Text key={ingredient.id}>
          • {ingredient.name}: {ingredient.amount} {ingredient.unit}
        </Text>
      ))}
    </Box>
  );
};
