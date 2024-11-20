import React from "react";
import {
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
  HStack,
  Text,
} from "@gluestack-ui/themed";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import { RecipeModel } from "@/src/models/RecipeModel";

type DirectionsProps = {
  selectedRecipe: RecipeModel | null;
};

const Directions = ({ selectedRecipe }: DirectionsProps) => {
  return (
    <AccordionItem value="directions">
      <AccordionHeader>
        <AccordionTrigger>
          {({ isExpanded }) => {
            return (
              <>
                <AccordionTitleText fontSize={"$xl"} fontWeight={"$semibold"}>
                  Directions ({selectedRecipe?.instructions.length})
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
        {selectedRecipe?.instructions.map((instruction, index) => (
          <HStack key={instruction}>
            <Text>{index + 1}. </Text>
            <AccordionContentText>
              <Text>{instruction}</Text>
            </AccordionContentText>
          </HStack>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default Directions;
