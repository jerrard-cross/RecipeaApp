import React, { useState } from "react";
import { ScrollView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  Input,
  InputField,
  VStack,
  Textarea,
  TextareaInput,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Image,
  HStack,
  Text,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Heading,
} from "@gluestack-ui/themed";
import palette from "../constants/palette";
import { RecipeModel } from "../models/RecipeModel";

interface RecipeFormProps {
  onSubmit: (data: RecipeModel) => void;
  onClose: () => void;
  initialData?: Partial<RecipeModel>;
}

const difficultyLevels = ["Easy", "Medium", "Hard"];
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];
const commonCuisines = [
  "Italian",
  "Chinese",
  "Indian",
  "Mexican",
  "Japanese",
  "Thai",
  "French",
  "Mediterranean",
  "American",
  "Other",
];

const RecipeForm: React.FC<RecipeFormProps> = ({
  onSubmit,
  onClose,
  initialData = {},
}) => {
  const [formData, setFormData] = useState<RecipeModel>({
    name: "",
    ingredients: [],
    instructions: [],
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    servings: 4,
    image: "",
    difficulty: "Medium",
    cuisine: "",
    tags: [],
    mealType: [],
    rating: 0,
    ...initialData,
  });

  const [newIngredient, setNewIngredient] = useState("");
  const [newTag, setNewTag] = useState("");
  const [showImagePicker, setShowImagePicker] = useState(false);

  // Image picker functions
  const pickImage = async (useCamera: boolean) => {
    let result;

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    if (useCamera) {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus.status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setFormData({ ...formData, image: result.assets[0].uri });
    }
    setShowImagePicker(false);
  };

  // Form handling functions
  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, newIngredient.trim()],
      });
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <ScrollView>
      <VStack space="md" p="$4">
        {/* Recipe Name */}
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Recipe Name</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter recipe name"
            />
          </Input>
        </FormControl>

        {/* Ingredients */}
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Ingredients</FormControlLabelText>
          </FormControlLabel>
          <VStack space="sm">
            {formData.ingredients.map((ingredient, index) => (
              <HStack key={index} space="sm" alignItems="center">
                <Text flex={1}>{ingredient}</Text>
                <Button
                  size="sm"
                  variant="outline"
                  borderColor={palette.primary}
                  rounded={"$full"}
                  onPress={() => handleRemoveIngredient(index)}
                >
                  <ButtonText color={palette.primary} rounded={"$full"}>
                    Remove
                  </ButtonText>
                </Button>
              </HStack>
            ))}
            <HStack space="sm">
              <Input flex={1}>
                <InputField
                  value={newIngredient}
                  onChangeText={setNewIngredient}
                  placeholder="Add ingredient"
                />
              </Input>
              <Button
                bgColor={palette.primary}
                rounded={"$full"}
                onPress={handleAddIngredient}
              >
                <ButtonText>Add</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </FormControl>

        {/* Instructions */}
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Instructions</FormControlLabelText>
          </FormControlLabel>
          <Textarea>
            <TextareaInput
              value={formData.instructions}
              onChangeText={(text) =>
                setFormData({ ...formData, instructions: text })
              }
              placeholder="Enter cooking instructions"
              numberOfLines={4}
            />
          </Textarea>
        </FormControl>

        {/* Time and Servings */}
        <HStack space="md">
          <FormControl flex={1}>
            <FormControlLabel>
              <FormControlLabelText>Prep Time (min)</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                value={formData.prepTimeMinutes.toString()}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    prepTimeMinutes: parseInt(text) || 0,
                  })
                }
                keyboardType="numeric"
              />
            </Input>
          </FormControl>

          <FormControl flex={1}>
            <FormControlLabel>
              <FormControlLabelText>Cook Time (min)</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                value={formData.cookTimeMinutes.toString()}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    cookTimeMinutes: parseInt(text) || 0,
                  })
                }
                keyboardType="numeric"
              />
            </Input>
          </FormControl>

          <FormControl flex={1}>
            <FormControlLabel>
              <FormControlLabelText>Servings</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                value={formData.servings.toString()}
                onChangeText={(text) =>
                  setFormData({ ...formData, servings: parseInt(text) || 0 })
                }
                keyboardType="numeric"
              />
            </Input>
          </FormControl>
        </HStack>

        {/* Image Picker */}
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Recipe Image</FormControlLabelText>
          </FormControlLabel>
          <VStack space="sm">
            {formData.image && (
              <Image
                source={{ uri: formData.image }}
                alt="Recipe"
                size="2xl"
                rounded="$md"
              />
            )}
            <Button
              bgColor={palette.primary}
              rounded={"$full"}
              onPress={() => setShowImagePicker(true)}
            >
              <ButtonText>
                {formData.image ? "Change Image" : "Add Image"}
              </ButtonText>
            </Button>
          </VStack>
        </FormControl>

        {/* Difficulty */}
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Difficulty</FormControlLabelText>
          </FormControlLabel>
          <Select
            selectedValue={formData.difficulty}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                difficulty: value as RecipeFormData["difficulty"],
              })
            }
          >
            <SelectTrigger>
              <SelectInput placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicator />
                {difficultyLevels.map((level) => (
                  <SelectItem key={level} label={level} value={level} />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl>

        {/* Cuisine */}
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Cuisine</FormControlLabelText>
          </FormControlLabel>
          <Select
            selectedValue={formData.cuisine}
            onValueChange={(value) =>
              setFormData({ ...formData, cuisine: value })
            }
          >
            <SelectTrigger>
              <SelectInput placeholder="Select cuisine" />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicator />
                {commonCuisines.map((cuisine) => (
                  <SelectItem key={cuisine} label={cuisine} value={cuisine} />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl>

        {/* Tags */}
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Tags</FormControlLabelText>
          </FormControlLabel>
          <VStack space="sm">
            {formData.tags.map((tag) => (
              <Button
                bgColor={palette.primary}
                rounded={"$full"}
                key={tag}
                onPress={() => handleRemoveTag(tag)}
                variant="outline"
              >
                <ButtonText>{tag}</ButtonText>
              </Button>
            ))}
            <HStack space="sm">
              <Input flex={1}>
                <InputField
                  value={newTag}
                  onChangeText={setNewTag}
                  placeholder="Add tag"
                />
              </Input>
              <Button
                bgColor={palette.primary}
                rounded={"$full"}
                onPress={handleAddTag}
              >
                <ButtonText>Add Tag</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </FormControl>

        {/* Meal Type */}
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Meal Type</FormControlLabelText>
          </FormControlLabel>
          <Select
            selectedValue={formData.mealType}
            onValueChange={(value) =>
              setFormData({ ...formData, mealType: value })
            }
          >
            <SelectTrigger>
              <SelectInput placeholder="Select meal type" />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicator />
                {mealTypes.map((type) => (
                  <SelectItem key={type} label={type} value={type} />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl>

        {/* Rating */}
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Rating</FormControlLabelText>
          </FormControlLabel>
          <Box px="$4">
            <Slider
              value={formData.rating}
              onChange={(value) => setFormData({ ...formData, rating: value })}
              minValue={0}
              maxValue={5}
              step={0.5}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb bgColor={palette.primary} />
            </Slider>
          </Box>
          <FormControlHelper>
            <FormControlHelperText>
              Rating: {formData.rating} / 5
            </FormControlHelperText>
          </FormControlHelper>
        </FormControl>

        {/* Submit Button */}
        <Button
          bgColor={palette.primary}
          rounded={"$full"}
          size="lg"
          onPress={handleSubmit}
        >
          <ButtonText>Save Recipe</ButtonText>
        </Button>
        <Button
          bgColor={palette.primary}
          rounded={"$full"}
          size="lg"
          onPress={handleClose}
        >
          <ButtonText>Cancel</ButtonText>
        </Button>
      </VStack>

      <AlertDialog
        isOpen={showImagePicker}
        onClose={() => setShowImagePicker(false)}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading>Select Image</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <VStack space="md">
              <Button
                bgColor={palette.primary}
                rounded={"$full"}
                onPress={() => pickImage(true)}
              >
                <ButtonText>Take Photo</ButtonText>
              </Button>
              <Button
                bgColor={palette.primary}
                rounded={"$full"}
                onPress={() => pickImage(false)}
              >
                <ButtonText>Choose from Library</ButtonText>
              </Button>
              <Button
                bgColor={palette.primary}
                rounded={"$full"}
                variant="outline"
                onPress={() => setShowImagePicker(false)}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
            </VStack>
          </AlertDialogBody>
          <AlertDialogFooter />
        </AlertDialogContent>
      </AlertDialog>
    </ScrollView>
  );
};

export default RecipeForm;
