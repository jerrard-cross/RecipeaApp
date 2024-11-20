import React from "react";
import {
  VStack,
  Box,
  Button,
  ButtonText,
  Progress,
  ProgressFilledTrack,
  HStack,
  Text,
  View,
} from "@gluestack-ui/themed";

import {
  FormProvider,
  useFormContext,
  useFormNavigation,
} from "../providers/FormProvider";
import { RecipeModel } from "../models/RecipeModel";
import { FormStep, STEPS } from "../lib/types";
import { BasicInfoStep } from "./Steps/BasicInfoStep";
import { TimeServingsStep } from "./Steps/TimeServingsStep";
import { IngredientsStep } from "./Steps/IngredientsStep";
import { InstructionsStep } from "./Steps/InstructionsStep";
import palette from "../constants/palette";

interface StepIndicatorProps {
  currentStep: FormStep;
  isStepValid: (step: FormStep) => boolean;
}

type RecipeFormProps = {
  selectedRecipe?: RecipeModel;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  isStepValid,
}) => {
  const currentStepIndex = STEPS.findIndex((step) => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  return (
    <VStack space="sm" p="$4">
      <Progress value={progress} w="100%" h="$2">
        <ProgressFilledTrack bgColor={palette.primary} />
      </Progress>
      <HStack justifyContent="space-between" flexWrap="wrap">
        {STEPS.map((step, index) => (
          <Box key={step.id} opacity={currentStep === step.id ? 1 : 0.6}>
            <Text
              fontSize="$xs"
              fontWeight={currentStep === step.id ? "$bold" : "$normal"}
              color={isStepValid(step.id) ? palette.primary : "$textDark500"}
            >
              {step.title}
            </Text>
          </Box>
        ))}
      </HStack>
    </VStack>
  );
};

interface StepNavigationProps {
  canProgress: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  canProgress,
  onNext,
  onPrevious,
  onSubmit,
  isFirstStep,
  isLastStep,
}) => (
  <HStack
    space="md"
    p="$4"
    borderTopWidth={1}
    borderTopColor="$borderLight200"
    bg="$white"
    justifyContent="space-between"
  >
    {!isFirstStep && (
      <Button
        borderColor={palette.primary}
        variant="outline"
        onPress={onPrevious}
        flex={1}
      >
        <ButtonText color={palette.primary}>Previous</ButtonText>
      </Button>
    )}

    <Button
      onPress={isLastStep ? onSubmit : onNext}
      bgColor={isLastStep ? palette.primary : "$transparent"}
      borderColor={isLastStep ? "$transparent" : palette.primary}
      flex={1}
      disabled={!canProgress}
      variant={isLastStep ? "solid" : "outline"}
    >
      <ButtonText color={isLastStep ? "$white" : palette.primary}>
        {isLastStep ? "Submit Recipe" : "Next"}
      </ButtonText>
    </Button>
  </HStack>
);

export const RecipeForm = ({ selectedRecipe }: RecipeFormProps) => {
  const { currentStep, isStepValid } = useFormContext();

  const {
    nextStep,
    previousStep,
    isFirstStep,
    isLastStep,
    submitForm,
    canProgress,
  } = useFormNavigation();

  const renderStep = () => {
    switch (currentStep) {
      case "basic":
        return <BasicInfoStep />;
      case "time":
        return <TimeServingsStep />;
      case "ingredients":
        return <IngredientsStep />;
      case "instructions":
        return <InstructionsStep />;
      // case "additional":
      //   return <AdditionalInfoStep />;
      default:
        return null;
    }
  };

  return (
    <Box flex={1} bg="$white">
      <StepIndicator currentStep={currentStep} isStepValid={isStepValid} />

      <View flex={1}>{renderStep()}</View>

      <StepNavigation
        canProgress={canProgress}
        onNext={nextStep}
        onPrevious={previousStep}
        onSubmit={submitForm}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </Box>
  );
};

// App.tsx or parent component
export const RecipeFormScreen: React.FC = () => {
  // const use;
  const handleSubmit = async (formData: RecipeModel) => {
    try {
      // Handle form submission
      // Example: Submit to API
      // await submitRecipe(formData);
      // Show success message
      // Alert.alert("Success", "Recipe saved successfully!");
    } catch (error) {
      // Handle error
      // Alert.alert("Error", "Failed to save recipe. Please try again.");
    }
  };

  return (
    <FormProvider onSubmit={handleSubmit}>
      <RecipeForm />
    </FormProvider>
  );
};

// Style constants for reuse across components
export const formStyles = {
  sectionContainer: {
    p: "$4",
    space: "md",
  },
  inputContainer: {
    mb: "$4",
  },
  label: {
    mb: "$2",
    fontSize: "$sm",
    fontWeight: "$medium",
  },
  helperText: {
    mt: "$1",
    fontSize: "$xs",
    color: "$textDark400",
  },
  errorText: {
    color: "$error500",
    fontSize: "$xs",
    mt: "$1",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    mt: "$4",
  },
};
