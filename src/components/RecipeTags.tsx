import React, { useEffect } from "react";

import { FlatList, HStack, Button, ButtonText } from "@gluestack-ui/themed";
import palette from "../constants/palette";
import { useRecipeStore } from "../stores";
import { observer } from "mobx-react-lite";

type RecipeTagsProps = {
  recipeTags: string[];
};

const RecipeTags = observer(({ recipeTags }: RecipeTagsProps) => {
  const { setSelectedTags, selectedTags } = useRecipeStore();

  return (
    <HStack gap={"$2"} flexWrap={"wrap"}>
      <FlatList
        data={recipeTags}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Button
            bgColor={
              selectedTags.includes(item as string)
                ? palette.primary
                : palette.white
            }
            size={"sm"}
            mx={"$1"}
            rounded={"$full"}
            onPress={() => {
              if (selectedTags.includes(item as string)) {
                setSelectedTags(selectedTags.filter((tag) => tag !== item));
              } else {
                setSelectedTags([...selectedTags, item as string]);
              }
            }}
          >
            <ButtonText
              color={
                selectedTags.includes(item as string)
                  ? palette.white
                  : palette.primary
              }
            >
              {item as string}
            </ButtonText>
          </Button>
        )}
      />
    </HStack>
  );
});

export default RecipeTags;
