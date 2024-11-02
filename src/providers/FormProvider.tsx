import React, { createContext, useContext, useState, useCallback } from "react";
import { FormStep } from "../lib/types";
import { RecipeModel } from "../models/RecipeModel";

interface FormContextType {
  formData: RecipeModel;
  updateFormData: (data: Partial<RecipeModel>) => void;
  currentStep: FormStep;
  setCurrentStep: (step: FormStep) => void;
  isStepValid: (step: FormStep) => boolean;
  nextStep: () => void;
  previousStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  submitForm: () => void;
}

const STEPS: FormStep[] = [
  "basic",
  "time",
  "ingredients",
  "instructions",
  "additional",
];

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: React.ReactNode;
  onSubmit: (data: RecipeModel) => void;
  initialData?: Partial<RecipeModel>;
}

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  onSubmit,
  initialData = {},
}) => {
  // Initialize form state with default values and any initial data
  const [formData, setFormData] = useState<RecipeModel>({
    name: "",
    image: "",
    difficulty: "Medium",
    cuisine: "",
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    servings: 4,
    ingredients: [],
    instructions: [],
    tags: [],
    rating: 0,
    ...initialData,
  });

  const [currentStep, setCurrentStep] = useState<FormStep>("basic");

  // Update form data with partial updates
  const updateFormData = useCallback((data: Partial<RecipeModel>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  // Validate each step
  const isStepValid = useCallback(
    (step: FormStep): boolean => {
      switch (step) {
        case "basic":
          return !!formData.name;
        case "time":
          return (
            formData.prepTimeMinutes > 0 &&
            formData.cookTimeMinutes > 0 &&
            formData.servings > 0
          );
        case "ingredients":
          return formData.ingredients.length > 0;
        case "instructions":
          return formData.instructions.some(
            (instruction) => instruction.trim() !== ""
          );
        case "additional":
          return true; // Optional step
        default:
          return false;
      }
    },
    [formData]
  );

  // Navigation helpers
  const currentStepIndex = STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  // Navigation methods
  const nextStep = useCallback(() => {
    if (!isLastStep && isStepValid(currentStep)) {
      const nextStepIndex = currentStepIndex + 1;
      setCurrentStep(STEPS[nextStepIndex]);
    }
  }, [currentStep, isLastStep, isStepValid, currentStepIndex]);

  const previousStep = useCallback(() => {
    if (!isFirstStep) {
      const previousStepIndex = currentStepIndex - 1;
      setCurrentStep(STEPS[previousStepIndex]);
    }
  }, [currentStepIndex, isFirstStep]);

  // Form submission
  const submitForm = useCallback(() => {
    // Validate all steps before submission
    const isValid = STEPS.every((step) => isStepValid(step));
    if (isValid) {
      onSubmit(formData);
    } else {
      // Find first invalid step and navigate to it
      const firstInvalidStep = STEPS.find((step) => !isStepValid(step));
      if (firstInvalidStep) {
        setCurrentStep(firstInvalidStep);
      }
    }
  }, [formData, isStepValid, onSubmit]);

  // Create context value object
  const contextValue = {
    formData,
    updateFormData,
    currentStep,
    setCurrentStep,
    isStepValid,
    nextStep,
    previousStep,
    isFirstStep,
    isLastStep,
    submitForm,
  };

  // Render provider with context value
  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

// Hook for consuming the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const useFormNavigation = () => {
  const {
    nextStep,
    previousStep,
    isFirstStep,
    isLastStep,
    currentStep,
    isStepValid,
    submitForm,
  } = useFormContext();

  return {
    nextStep,
    previousStep,
    isFirstStep,
    isLastStep,
    currentStep,
    isStepValid,
    submitForm,
    canProgress: isStepValid(currentStep),
  };
};
