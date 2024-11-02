import React, { useState } from "react";
import {
  VStack,
  HStack,
  Box,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorText,
  Input,
  InputField,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectItem,
  Image,
  Button,
  ButtonText,
  Icon,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Pressable,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { Camera, ImagePlus, Trash2 } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { useFormContext } from "@/src/providers/FormProvider";
import { CUISINES, DIFFICULTY_LEVELS, MEAL_TYPES } from "@/src/lib/types";
import { Heading } from "@gluestack-ui/themed";

interface ValidationErrors {
  name?: string;
}

export const BasicInfoStep: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Image picker functions
  const requestPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        throw new Error(
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    }
  };

  const pickImage = async (useCamera: boolean = false) => {
    try {
      await requestPermissions();

      let result;

      if (useCamera) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          throw new Error(
            "Sorry, we need camera permissions to make this work!"
          );
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
        updateFormData({ image: result.assets[0].uri });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      // Handle error appropriately
    } finally {
      setShowImagePicker(false);
    }
  };

  // Validation functions
  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Recipe name is required";
        } else if (value.length < 3) {
          newErrors.name = "Recipe name must be at least 3 characters";
        } else {
          delete newErrors.name;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Event handlers
  const handleFieldChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(
      field,
      formData[field as keyof typeof formData]?.toString() || ""
    );
  };

  const removeImage = () => {
    updateFormData({ image: "" });
  };

  return (
    <VStack space="lg" p="$4">
      {/* Recipe Name */}
      <FormControl isRequired isInvalid={!!errors.name && touched.name}>
        <FormControlLabel>
          <FormControlLabelText>Recipe Name</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            value={formData.name}
            onChangeText={(text) => handleFieldChange("name", text)}
            onBlur={() => handleFieldBlur("name")}
            placeholder="Enter your recipe name"
          />
        </Input>
        {touched.name && errors.name && (
          <FormControlError>
            <FormControlErrorText>{errors.name}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Image Picker */}
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Recipe Image</FormControlLabelText>
        </FormControlLabel>
        <Box my="$2">
          {formData.image ? (
            <Box position="relative">
              <Image
                source={{ uri: formData.image }}
                alt="Recipe"
                size="2xl"
                rounded="$lg"
              />
              <Pressable
                position="absolute"
                top="$2"
                right="$2"
                bg="$error500"
                p="$2"
                borderRadius="$full"
                onPress={removeImage}
              >
                <Icon as={Trash2} color="$white" size="sm" />
              </Pressable>
            </Box>
          ) : (
            <Pressable
              onPress={() => setShowImagePicker(true)}
              borderWidth={2}
              borderStyle="dashed"
              borderColor="$borderLight400"
              borderRadius="$lg"
              p="$8"
              alignItems="center"
              bg="$backgroundLight50"
            >
              <Icon as={ImagePlus} size="xl" color="$textLight400" />
              <Box mt="$2">
                <ButtonText>Add Recipe Image</ButtonText>
              </Box>
            </Pressable>
          )}
        </Box>
        <FormControlHelper>
          <FormControlHelperText>
            Add a photo of your finished recipe
          </FormControlHelperText>
        </FormControlHelper>
      </FormControl>

      {/* Difficulty */}
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Difficulty</FormControlLabelText>
        </FormControlLabel>
        <Select
          selectedValue={formData.difficulty}
          onValueChange={(value) => handleFieldChange("difficulty", value)}
        >
          <SelectTrigger>
            <SelectInput placeholder="Select difficulty level" />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicator />
              {DIFFICULTY_LEVELS.map((level) => (
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
          onValueChange={(value) => handleFieldChange("cuisine", value)}
        >
          <SelectTrigger>
            <SelectInput placeholder="Select cuisine type" />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicator />
              {CUISINES.map((cuisine) => (
                <SelectItem key={cuisine} label={cuisine} value={cuisine} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </FormControl>

      {/* Image Picker Dialog */}
      <AlertDialog
        isOpen={showImagePicker}
        onClose={() => setShowImagePicker(false)}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading>Choose Image Source</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <VStack space="md">
              <Button
                size="md"
                variant="outline"
                action="primary"
                onPress={() => pickImage(true)}
              >
                <ButtonIcon as={Camera} />
                <ButtonText>Take Photo</ButtonText>
              </Button>
              <Button
                size="md"
                variant="outline"
                action="primary"
                onPress={() => pickImage(false)}
              >
                <ButtonIcon as={ImagePlus} />
                <ButtonText>Choose from Library</ButtonText>
              </Button>
              <Button
                size="md"
                variant="outline"
                action="secondary"
                onPress={() => setShowImagePicker(false)}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
            </VStack>
          </AlertDialogBody>
          <AlertDialogFooter />
        </AlertDialogContent>
      </AlertDialog>
    </VStack>
  );
};
