import React, { useEffect } from "react";
import Animated from "react-native-reanimated";
import { useRecipeStore } from "@/src/stores";
import { observer } from "mobx-react-lite";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";
import SectionTitle from "@/src/components/SectionTitle";
import {
  Accordion,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
  Button,
  ButtonText,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  StatusBar,
  View,
  VStack,
} from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import palette from "@/src/constants/palette";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Minus,
  Plus,
} from "lucide-react-native";
import { AccordionContent } from "@gluestack-ui/themed";

const RecipeDetailsScreen = observer(() => {
  const { selectedRecipe } = useRecipeStore();
  const [servings, setServings] = React.useState(selectedRecipe?.servings || 1);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Recipe",
          headerBackTitle: "Go Back",
          headerTintColor: palette.primary,
        }}
      />
      <StatusBar barStyle="dark-content" />

      <ScrollView p={"$4"} flex={1}>
        <SectionTitle title={selectedRecipe?.name || ""} />
        <Image
          source={{ uri: selectedRecipe?.image }}
          alt={selectedRecipe?.name}
          objectFit="cover"
          w={"100%"}
          h={"$48"}
          rounded={"$2xl"}
        />
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

        <Accordion
          flex={1}
          type="single"
          variant="unfilled"
          defaultValue={["ingredients"]}
        >
          <AccordionItem value="ingredients">
            <AccordionHeader>
              <AccordionTrigger>
                {({ isExpanded }) => {
                  return (
                    <>
                      <AccordionTitleText
                        fontSize={"$xl"}
                        fontWeight={"$semibold"}
                      >
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
              <AccordionContentText>
                {selectedRecipe?.ingredients.map((ingredient, index) => (
                  <HStack key={index} mb={"$2"}>
                    <Text>{ingredient.toString()}</Text>
                  </HStack>
                ))}
              </AccordionContentText>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="directions">
            <AccordionHeader>
              <AccordionTrigger>
                {({ isExpanded }) => {
                  return (
                    <>
                      <AccordionTitleText
                        fontSize={"$xl"}
                        fontWeight={"$semibold"}
                      >
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
              <AccordionContentText>
                {selectedRecipe?.instructions.map((instruction, index) => (
                  <HStack key={index} mb={"$2"}>
                    <Text>{index + 1}. </Text>
                    <Text>{instruction}</Text>
                  </HStack>
                ))}
              </AccordionContentText>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollView>
    </>
  );
});

export default RecipeDetailsScreen;
