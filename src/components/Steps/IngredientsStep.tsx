import React, { useEffect, useState } from "react";
import {
  VStack,
  HStack,
  Box,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  Input,
  InputField,
  Button,
  ButtonText,
  Icon,
  Text,
  Pressable,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { GripVertical, Plus, Trash2 } from "lucide-react-native";
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { useFormContext } from "@/src/providers/FormProvider";
import { IngredientsModel } from "@/src/models/IngredientsModel";
import palette from "@/src/constants/palette";

export const IngredientsStep: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [newIngredient, setNewIngredient] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Event handlers
  const handleAddIngredient = () => {
    if (!newIngredient.trim()) {
      setError("Ingredient cannot be empty");
      return;
    }

    updateFormData({
      ingredients: [...formData.ingredients, newIngredient.trim()],
    });
    setNewIngredient("");
    setError(null);
  };

  const handleDeleteIngredient = (index: number) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    updateFormData({ ingredients: newIngredients });
  };

  const handleDragEnd = (updatedIngredients: string[]) => {
    updateFormData({ ingredients: updatedIngredients });
  };

  // Render ingredient item
  const renderIngredientItem = ({
    item,
    drag,
    isActive,
    getIndex,
  }: RenderItemParams<string>) => {
    const [index, setIndex] = useState(getIndex());

    useEffect(() => {
      const currentIndex = getIndex();
      if (index !== undefined) {
        setIndex(currentIndex);
      }
    }, [getIndex]);
    return (
      <ScaleDecorator>
        <Pressable
          onLongPress={drag}
          disabled={isActive}
          opacity={isActive ? 0.5 : 1}
          bg="$white"
          borderRadius="$md"
          borderWidth={1}
          borderColor="$borderLight200"
          mb="$2"
        >
          <HStack space="md" alignItems="center" p="$3">
            <Icon as={GripVertical} size="sm" color="$textLight400" />
            <Text flex={1} fontSize="$md">
              {item}
            </Text>
            <Button
              variant="outline"
              size="sm"
              action="negative"
              onPress={() =>
                handleDeleteIngredient(formData.ingredients.indexOf(item))
              }
            >
              <Icon as={Trash2} size="sm" />
            </Button>
          </HStack>
        </Pressable>
      </ScaleDecorator>
    );
  };

  return (
    <VStack space="lg" p="$4" flex={1}>
      {/* Header */}
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="$lg" fontWeight="$medium">
          Ingredients ({formData.ingredients.length})
        </Text>
      </HStack>

      {/* Add Ingredient Form */}
      <FormControl isInvalid={!!error}>
        <FormControlLabel>
          <FormControlLabelText>Add Ingredient</FormControlLabelText>
        </FormControlLabel>
        <HStack space="sm">
          <Input flex={1}>
            <InputField
              value={newIngredient}
              onChangeText={(text) => {
                setNewIngredient(text);
                setError(null);
              }}
              placeholder="e.g., 2 cups flour"
              onSubmitEditing={handleAddIngredient}
              returnKeyType="done"
            />
          </Input>
          <Button bgColor={palette.primary} onPress={handleAddIngredient}>
            <ButtonIcon as={Plus} />
            <ButtonText>Add</ButtonText>
          </Button>
        </HStack>
        {error ? (
          <FormControlError>
            <FormControlErrorText>{error}</FormControlErrorText>
          </FormControlError>
        ) : (
          <FormControlHelper>
            <FormControlHelperText>
              Include amount, unit, and ingredient name
            </FormControlHelperText>
          </FormControlHelper>
        )}
      </FormControl>

      {/* Ingredients List */}
      {formData.ingredients.length === 0 ? (
        <Box
          p="$4"
          bg="$backgroundLight100"
          borderRadius="$lg"
          borderWidth={1}
          borderColor="$borderLight200"
          alignItems="center"
        >
          <Text color="$textLight500">
            No ingredients added yet. Start by adding ingredients above.
          </Text>
        </Box>
      ) : (
        <Box flex={1}>
          <DraggableFlatList
            data={formData.ingredients}
            onDragEnd={({ data }) => handleDragEnd(data)}
            keyExtractor={(item, index) => `ingredient-${index}`}
            renderItem={renderIngredientItem}
          />
        </Box>
      )}

      {formData.ingredients.length > 0 && (
        <Text fontSize="$sm" color="$textLight500" textAlign="center">
          Tip: Long press and drag to reorder ingredients
        </Text>
      )}
    </VStack>
  );
};
