import React, { useState } from "react";
import SectionTitle from "./SectionTitle";
import { VStack } from "@gluestack-ui/themed";
import SearchRecipes from "./SearchRecipes";

const MyRecipes = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <VStack gap={"$4"} mt={"$4"}>
      <SectionTitle title="Let's get cooking" />
      <SearchRecipes
        placeholder="Search My Recipes"
        value={searchText}
        onChangeText={setSearchText}
      />
    </VStack>
  );
};

export default MyRecipes;
