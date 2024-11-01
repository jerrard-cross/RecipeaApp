import React, { useState } from "react";
import {
  Button,
  ButtonText,
  Center,
  HStack,
  SafeAreaView,
  VStack,
} from "@gluestack-ui/themed";
import Animated from "react-native-reanimated";
import palette from "../constants/palette";
import { findNodeHandle, Platform, KeyboardAvoidingView } from "react-native";

import { FormControl } from "@gluestack-ui/themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BaseModal from "./Modals/BaseModal";
import SubSectionTitle from "./SubSectionTitle";
import { RecipeModel } from "../models/RecipeModel";
import RecipeForm from "./RecipeForm";
import { create } from "react-test-renderer";
import { useRecipeStore } from "../stores";
const AddRecipeButton = () => {
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
      <KeyboardAwareScrollView bounces={true} enableOnAndroid={true}>
        <BaseModal isOpen={showActionsheet} onClose={handleClose} size={"full"}>
          <SubSectionTitle title="Add Recipe" hasButton={false} />
          <VStack w={"$full"} gap={"$2"}>
            <RecipeForm
              onSubmit={(values) => {
                createRecipe(values);
                handleClose();
              }}
              onClose={handleClose}
            />
          </VStack>
        </BaseModal>
      </KeyboardAwareScrollView>
    </>
  );
};

export default AddRecipeButton;
