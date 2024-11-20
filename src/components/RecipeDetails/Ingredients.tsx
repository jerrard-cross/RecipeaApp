import React from "react";
import {
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
  VStack,
} from "@gluestack-ui/themed";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import { RecipeModel } from "@/src/models/RecipeModel";

type IngredientsProps = {
  selectedRecipe: RecipeModel | null;
};

const Ingredients = ({ selectedRecipe }: IngredientsProps) => {
  return (
    <AccordionItem value="ingredients">
      <AccordionHeader>
        <AccordionTrigger>
          {({ isExpanded }) => {
            return (
              <>
                <AccordionTitleText fontSize={"$xl"} fontWeight={"$semibold"}>
                  Ingredients ({selectedRecipe?.ingredients.length})
                </AccordionTitleText>
                {isExpanded ? (
                  <AccordionIcon as={ChevronUpIcon} ml="$3" />
                ) : (
                  <AccordionIcon as={ChevronDownIcon} ml="$3" />
                )}
              </>
            );
          }}
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>
        <VStack mb={"$2"}>
          {selectedRecipe?.ingredients.map((ingredient, index) => (
            <AccordionContentText key={ingredient}>
              {index + 1}. {ingredient.toString()}
            </AccordionContentText>
          ))}
        </VStack>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Ingredients;
