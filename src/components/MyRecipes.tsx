import React, { useState } from "react";
import SectionTitle from "./SectionTitle";
import { VStack } from "@gluestack-ui/themed";
import SearchRecipes from "./SearchRecipes";

const MyRecipes = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <VStack gap={"$4"}>
      <SectionTitle title="My Recipes" />
      <SearchRecipes
        placeholder="Search My Recipes"
        value={searchText}
        onChangeText={setSearchText}
      />
    </VStack>
  );
};

export default MyRecipes;
