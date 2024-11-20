import React from "react";
import { Heading, HStack, Pressable } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { RecipeModel } from "@/src/models/RecipeModel";
import palette from "@/src/constants/palette";
import { Icon } from "@gluestack-ui/themed";
import { Minus, Plus } from "lucide-react-native";
import { Text } from "@gluestack-ui/themed";

type RecipeInfoProps = {
  servings: number;
  setServings: (value: number) => void;
  selectedRecipe: RecipeModel | null;
};

const RecipeInfo = ({
  servings,
  setServings,
  selectedRecipe,
}: RecipeInfoProps) => {
  return (
    <HStack justifyContent="space-around" mt={"$4"}>
      <VStack>
        <Heading fontSize={"$lg"} bold textAlign="center">
          Servings
        </Heading>
        <HStack justifyContent="center" alignItems="center" gap={"$2"}>
          <Pressable
            alignItems="center"
            justifyContent="center"
            rounded={"$full"}
            h={"$6"}
            w={"$6"}
            bgColor={palette.grey}
            onPress={() => setServings(servings - 1)}
          >
            <Icon fontSize={"$sm"} as={Minus} />
          </Pressable>
          <Text>{servings}</Text>
          <Pressable
            alignItems="center"
            justifyContent="center"
            rounded={"$full"}
            h={"$6"}
            w={"$6"}
            bgColor={palette.grey}
            onPress={() => setServings(servings + 1)}
          >
            <Icon as={Plus} />
          </Pressable>
        </HStack>
      </VStack>
      <VStack>
        <Heading fontSize={"$lg"} bold textAlign="center">
          Preparation
        </Heading>
        <Text textAlign="center" fontSize={"$sm"}>
          {selectedRecipe?.prepTimeMinutes} min
        </Text>
      </VStack>
      <VStack>
        <Heading fontSize={"$lg"} bold textAlign="center">
          Cook
        </Heading>
        <Text textAlign="center" fontSize={"$sm"}>
          {selectedRecipe?.cookTimeMinutes} min
        </Text>
      </VStack>
    </HStack>
  );
};

export default RecipeInfo;
