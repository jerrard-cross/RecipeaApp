import React, { useState } from "react";
import {
  VStack,
  HStack,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorText,
  Input,
  InputField,
  Button,
  ButtonText,
  Icon,
  Text,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@gluestack-ui/themed";
import { useFormContext } from "@/src/providers/FormProvider";
import { Clock, Minus, Plus } from "lucide-react-native";
import palette from "@/src/constants/palette";

interface ValidationErrors {
  prepTimeMinutes?: string;
  cookTimeMinutes?: string;
  servings?: string;
}

export const TimeServingsStep: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation functions
  const validateField = (field: string, value: number) => {
    const newErrors = { ...errors };

    switch (field) {
      case "prepTimeMinutes":
        if (value < 0) {
          newErrors.prepTimeMinutes = "Prep time cannot be negative";
        } else if (value > 480) {
          // 8 hours max
          newErrors.prepTimeMinutes = "Prep time cannot exceed 8 hours";
        } else {
          delete newErrors.prepTimeMinutes;
        }
        break;

      case "cookTimeMinutes":
        if (value < 0) {
          newErrors.cookTimeMinutes = "Cook time cannot be negative";
        } else if (value > 1440) {
          // 24 hours max
          newErrors.cookTimeMinutes = "Cook time cannot exceed 24 hours";
        } else {
          delete newErrors.cookTimeMinutes;
        }
        break;

      case "servings":
        if (value < 1) {
          newErrors.servings = "Servings must be at least 1";
        } else if (value > 100) {
          newErrors.servings = "Servings cannot exceed 100";
        } else {
          delete newErrors.servings;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper functions
  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  };

  const handleNumberChange = (field: string, value: string) => {
    const numValue = parseInt(value) || 0;
    if (validateField(field, numValue)) {
      updateFormData({ [field]: numValue });
    }
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const incrementValue = (field: string, increment: number) => {
    const currentValue = formData[field as keyof typeof formData] as number;
    const newValue = currentValue + increment;
    if (validateField(field, newValue)) {
      updateFormData({ [field]: newValue });
    }
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getTotalTime = () => {
    return formData.prepTimeMinutes + formData.cookTimeMinutes;
  };

  return (
    <VStack space="xl" p="$4">
      {/* Prep Time */}
      <FormControl
        isRequired
        isInvalid={!!errors.prepTimeMinutes && touched.prepTimeMinutes}
      >
        <FormControlLabel>
          <FormControlLabelText>Preparation Time</FormControlLabelText>
        </FormControlLabel>
        <HStack space="sm" alignItems="center">
          <Button
            variant="outline"
            borderColor={palette.primary}
            size="sm"
            onPress={() => incrementValue("prepTimeMinutes", -5)}
            disabled={formData.prepTimeMinutes <= 0}
          >
            <Icon as={Minus} size="sm" />
          </Button>
          <Input flex={1}>
            <InputField
              value={formData.prepTimeMinutes.toString()}
              onChangeText={(text) =>
                handleNumberChange("prepTimeMinutes", text)
              }
              keyboardType="numeric"
              textAlign="center"
            />
          </Input>
          <Button
            variant="outline"
            borderColor={palette.primary}
            size="sm"
            onPress={() => incrementValue("prepTimeMinutes", 5)}
          >
            <Icon as={Plus} size="sm" />
          </Button>
        </HStack>
        <FormControlHelper>
          <FormControlHelperText>
            {formatTime(formData.prepTimeMinutes)}
          </FormControlHelperText>
        </FormControlHelper>
        {touched.prepTimeMinutes && errors.prepTimeMinutes && (
          <FormControlError>
            <FormControlErrorText>
              {errors.prepTimeMinutes}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Cook Time */}
      <FormControl
        isRequired
        isInvalid={!!errors.cookTimeMinutes && touched.cookTimeMinutes}
      >
        <FormControlLabel>
          <FormControlLabelText>Cooking Time</FormControlLabelText>
        </FormControlLabel>
        <HStack space="sm" alignItems="center">
          <Button
            variant="outline"
            borderColor={palette.primary}
            size="sm"
            onPress={() => incrementValue("cookTimeMinutes", -5)}
            disabled={formData.cookTimeMinutes <= 0}
          >
            <Icon as={Minus} size="sm" />
          </Button>
          <Input flex={1}>
            <InputField
              value={formData.cookTimeMinutes.toString()}
              onChangeText={(text) =>
                handleNumberChange("cookTimeMinutes", text)
              }
              keyboardType="numeric"
              textAlign="center"
            />
          </Input>
          <Button
            variant="outline"
            borderColor={palette.primary}
            size="sm"
            onPress={() => incrementValue("cookTimeMinutes", 5)}
          >
            <Icon as={Plus} size="sm" />
          </Button>
        </HStack>
        <FormControlHelper>
          <FormControlHelperText>
            {formatTime(formData.cookTimeMinutes)}
          </FormControlHelperText>
        </FormControlHelper>
        {touched.cookTimeMinutes && errors.cookTimeMinutes && (
          <FormControlError>
            <FormControlErrorText>
              {errors.cookTimeMinutes}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Total Time Summary */}
      <Box
        bg="$backgroundLight100"
        p="$4"
        borderRadius="$lg"
        borderWidth={1}
        borderColor="$borderLight200"
      >
        <HStack space="md" alignItems="center">
          <Icon as={Clock} size="md" color={palette.primary} />
          <VStack>
            <Text fontWeight="$medium">Total Time</Text>
            <Text fontSize="$sm" color="$textLight600">
              {formatTime(getTotalTime())}
            </Text>
          </VStack>
        </HStack>
      </Box>

      {/* Servings */}
      <FormControl isRequired isInvalid={!!errors.servings && touched.servings}>
        <FormControlLabel>
          <FormControlLabelText>Number of Servings</FormControlLabelText>
        </FormControlLabel>
        <VStack space="md">
          <HStack space="sm" alignItems="center">
            <Button
              variant="outline"
              borderColor={palette.primary}
              size="sm"
              onPress={() => incrementValue("servings", -1)}
              disabled={formData.servings <= 1}
            >
              <Icon as={Minus} size="sm" />
            </Button>
            <Input flex={1}>
              <InputField
                value={formData.servings.toString()}
                onChangeText={(text) => handleNumberChange("servings", text)}
                keyboardType="numeric"
                textAlign="center"
              />
            </Input>
            <Button
              variant="outline"
              borderColor={palette.primary}
              size="sm"
              onPress={() => incrementValue("servings", 1)}
              disabled={formData.servings >= 100}
            >
              <Icon as={Plus} size="sm" />
            </Button>
          </HStack>
          <Box px="$4">
            <Slider
              value={formData.servings}
              onChange={(value) =>
                handleNumberChange("servings", value.toString())
              }
              minValue={1}
              maxValue={20}
              step={1}
            >
              <SliderTrack>
                <SliderFilledTrack bgColor={palette.primary} />
              </SliderTrack>
              <SliderThumb bgColor={palette.primary} />
            </Slider>
          </Box>
        </VStack>
        {touched.servings && errors.servings && (
          <FormControlError>
            <FormControlErrorText>{errors.servings}</FormControlErrorText>
          </FormControlError>
        )}
        <FormControlHelper mt={"$4"}>
          <FormControlHelperText>
            Adjust the number of people this recipe serves
          </FormControlHelperText>
        </FormControlHelper>
      </FormControl>
    </VStack>
  );
};
