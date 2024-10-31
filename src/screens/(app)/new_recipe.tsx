import React, { useState } from "react";
import {
  Box,
  FormControl,
  Heading,
  Input,
  Select,
  SelectItem,
  Button,
  VStack,
  ButtonText,
  FormControlLabel,
  FormControlLabelText,
  InputField,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  Icon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
} from "@gluestack-ui/themed";
import { ChevronDown } from "lucide-react-native";

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    servings: "",
    time: "",
    category: "",
  });

  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
    "Appetizer",
  ];

  const handleSubmit = () => {
    console.log("Recipe submitted:", recipe);
    // Handle form submission logic here
  };

  return (
    <Box
      p="$4"
      maxWidth="$96"
      width="100%"
      borderWidth="$1"
      borderRadius="$lg"
      borderColor="$borderLight300"
      bg="$white"
    >
      <VStack space="md">
        <Heading size="lg">Create New Recipe</Heading>

        {/* Recipe Name Input */}
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Recipe Name</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              placeholder="Enter recipe name"
              value={recipe.name}
              onChangeText={(value) =>
                setRecipe((prev) => ({ ...prev, name: value }))
              }
            />
          </Input>
        </FormControl>

        {/* Servings Input */}
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Servings</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              placeholder="Number of servings"
              keyboardType="numeric"
              value={recipe.servings}
              onChangeText={(value) =>
                setRecipe((prev) => ({ ...prev, servings: value }))
              }
            />
          </Input>
        </FormControl>

        {/* Cooking Time Input */}
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Cooking Time (minutes)</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              placeholder="Enter cooking time"
              keyboardType="numeric"
              value={recipe.time}
              onChangeText={(value) =>
                setRecipe((prev) => ({ ...prev, time: value }))
              }
            />
          </Input>
        </FormControl>

        {/* Category Select */}
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Category</FormControlLabelText>
          </FormControlLabel>
          <Select
            selectedValue={recipe.category}
            onValueChange={(value) =>
              setRecipe((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectInput placeholder="Select a category" />
              <Icon as={ChevronDown} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    label={category}
                    value={category.toLowerCase()}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Button
          size="lg"
          variant="solid"
          action="primary"
          onPress={handleSubmit}
        >
          <ButtonText>Create Recipe</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

export default RecipeForm;
