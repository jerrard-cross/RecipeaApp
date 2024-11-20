import React, { useState } from "react";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  HStack,
  VStack,
} from "@gluestack-ui/themed";
import palette from "../constants/palette";

import BaseModal from "./Modals/BaseModal";
import SubSectionTitle from "./SubSectionTitle";
import { useRecipeStore } from "../stores";
import { RecipeForm } from "./RecipeForm";
import { FormProvider } from "../providers/FormProvider";
import { X } from "lucide-react-native";
const EditRecipe = () => {
  const { updateRecipe, selectedRecipe } = useRecipeStore();
  const [showActionsheet, setShowActionsheet] = useState(false);

  const handleClose = () => setShowActionsheet(!showActionsheet);

  return (
    <>
      <Button
        rounded={"$full"}
        bgColor={palette.primaryDark}
        onPress={handleClose}
      >
        <ButtonText>Edit {selectedRecipe?.name || "Recipe"} </ButtonText>
      </Button>
      <BaseModal isOpen={showActionsheet} onClose={handleClose} size={"full"}>
        <HStack justifyContent="space-between" alignItems="center">
          <SubSectionTitle
            title={`Edit ${selectedRecipe?.name || "Recipe"} `}
            hasButton={false}
          />
          <Button onPress={handleClose} rounded={"$full"} variant="link">
            <ButtonIcon as={X} color={palette.primary} size={"xl"} />
          </Button>
        </HStack>
        <VStack w={"$full"} gap={"$2"}>
          <FormProvider
            onSubmit={(values) => {
              updateRecipe(values);
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

export default EditRecipe;
