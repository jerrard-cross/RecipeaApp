import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  FormControl,
  Input,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  InputField,
  ChevronDownIcon,
} from "@gluestack-ui/themed";
import { RecipeModel } from "../models/RecipeModel";

const RecipeForm = () => {
  const [recipe, setRecipe] = useState<RecipeModel>({
    name: "",
    description: "",
    instructions: "",
    ingredients: [],
    image: "",
    category: "",
    time: "",
    servings: "",
    user_id: "",
  });

  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
    "Appetizer",
  ];

  return (
    <>
      {/* Recipe Name */}
      <FormControl isRequired>
        <FormControl.Label>
          <Text>Recipe Name</Text>
        </FormControl.Label>
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

      {/* Servings */}
      <FormControl isRequired>
        <FormControl.Label>
          <Text>Servings</Text>
        </FormControl.Label>
        <Input>
          <InputField
            placeholder="Number of servings"
            value={recipe.servings}
            keyboardType="numeric"
            onChangeText={(value) =>
              setRecipe((prev) => ({ ...prev, servings: value }))
            }
          />
        </Input>
      </FormControl>

      {/* Cooking Time */}
      <FormControl isRequired>
        <FormControl.Label>
          <Text>Cooking Time (minutes)</Text>
        </FormControl.Label>
        <Input>
          <InputField
            placeholder="Cooking time in minutes"
            value={recipe.time}
            keyboardType="numeric"
            onChangeText={(value) =>
              setRecipe((prev) => ({ ...prev, time: value }))
            }
          />
        </Input>
      </FormControl>

      {/* Category */}
      <FormControl isRequired>
        <FormControl.Label>
          <Text>Category</Text>
        </FormControl.Label>
        <Select
          selectedValue={recipe.category}
          onValueChange={(value) =>
            setRecipe((prev) => ({ ...prev, category: value }))
          }
        >
          <SelectTrigger>
            <SelectInput placeholder="Select a category" />
            <SelectIcon mr="$3" as={ChevronDownIcon} />
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
    </>
  );
};

export default RecipeForm;
