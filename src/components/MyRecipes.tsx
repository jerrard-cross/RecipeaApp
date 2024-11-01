import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import { VStack } from "@gluestack-ui/themed";
import SearchRecipes from "./SearchRecipes";
import useDebounce from "../hooks/useDebounce";
import { useRecipeStore } from "../stores";

const MyRecipes = () => {
  const { searchRecipes } = useRecipeStore();
  const [searchText, setSearchText] = useState("");

  const fetchRecipes = (searchText: string) => {
    searchRecipes(searchText);
  };

  const debounceSearch = useDebounce(fetchRecipes, 500);

  const handleSearch = (text: string) => {
    setSearchText(text);
    debounceSearch(text);
  };

  return (
    <VStack gap={"$4"} mt={"$4"}>
      <SectionTitle title="Let's get cooking" />
      <SearchRecipes
        placeholder="Search My Recipes"
        value={searchText}
        onChangeText={handleSearch}
      />
    </VStack>
  );
};

export default MyRecipes;
