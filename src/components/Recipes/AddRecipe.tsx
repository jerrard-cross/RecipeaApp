import React, { useState } from "react";
import {
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  VStack,
} from "@gluestack-ui/themed";
import palette from "../../constants/palette";

import BaseModal from "../Modals/BaseModal";
import SubSectionTitle from "../Misc/SubSectionTitle";
import { useRecipeStore } from "../../stores";
import { RecipeForm } from "./RecipeForm";
import { FormProvider } from "../../providers/FormProvider";
import { X } from "lucide-react-native";
const AddRecipe = () => {
  const { createRecipe } = useRecipeStore();
  const [showActionsheet, setShowActionsheet] = useState(false);

  const handleClose = () => setShowActionsheet(!showActionsheet);

  return (
    <>
      <Button
        rounded={"$full"}
        bgColor={palette.primaryDark}
        onPress={handleClose}
      >
        <ButtonText>Add New Recipe</ButtonText>
      </Button>
      <BaseModal
        isOpen={showActionsheet}
        onClose={handleClose}
        size={"full"}
        scrollableDisabled
      >
        <HStack justifyContent="space-between" alignItems="center">
          <SubSectionTitle title="Add Recipe" hasButton={false} />
          <Button onPress={handleClose} rounded={"$full"} variant="link">
            <ButtonIcon as={X} color={palette.primary} size={"xl"} />
          </Button>
        </HStack>
        <VStack w={"$full"} gap={"$2"}>
          <FormProvider
            onSubmit={(values) => {
              createRecipe(values);
              handleClose();
            }}
          >
            <RecipeForm />
          </FormProvider>
        </VStack>
      </BaseModal>
    </>
  );
};

export default AddRecipe;
