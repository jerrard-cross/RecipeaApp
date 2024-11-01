import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  ButtonText,
  FlatList,
  HStack,
  VStack,
  Text,
  Icon,
  GluestackUIProvider,
} from "@gluestack-ui/themed";
import { Plus } from "lucide-react-native";
import {
  Ingredient,
  SelectedIngredient,
  NewIngredient,
  Unit,
  UNITS,
} from "@/src/lib/types";
import SubSectionTitle from "@/src/components/SubSectionTitle";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/src/components/SearchRecipes";
import TypeFilter from "@/src/components/TypeFilter";
import IngredientsList from "@/src/components/IngredientsList";
import { AddIngredientModal } from "@/src/components/Modals/AddIngredientModal";

const IngredientSelectionPage = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: "1", name: "Tomato", type: "Vegetable" },
    { id: "2", name: "Chicken", type: "Protein" },
    { id: "3", name: "Olive Oil", type: "Oil" },
    { id: "4", name: "Rice", type: "Grain" },
    { id: "5", name: "Salt", type: "Seasoning" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedIngredients, setSelectedIngredients] = useState<
    SelectedIngredient[]
  >([]);
  const [filterType, setFilterType] = useState<string>("");

  const ingredientTypes = useMemo<string[]>(() => {
    return [...new Set(ingredients.map((item) => item.type))];
  }, [ingredients]);

  const filteredIngredients = useMemo<Ingredient[]>(() => {
    return ingredients.filter((ingredient) => {
      const matchesSearch = ingredient.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType = !filterType || ingredient.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [ingredients, searchQuery, filterType]);

  const handleAddIngredient = (newIngredient: NewIngredient): void => {
    const newId = (ingredients.length + 1).toString();
    setIngredients((prev) => [...prev, { id: newId, ...newIngredient }]);
  };

  const toggleIngredient = (ingredient: Ingredient): void => {
    setSelectedIngredients((prev) => {
      const isSelected = prev.some((item) => item.id === ingredient.id);
      if (isSelected) {
        return prev.filter((item) => item.id !== ingredient.id);
      }
      return [...prev, { ...ingredient, amount: "", unit: "grams" as Unit }];
    });
  };

  const updateIngredientAmount = (id: string, amount: string): void => {
    setSelectedIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount } : item))
    );
  };

  const updateIngredientUnit = (id: string, unit: string): void => {
    setSelectedIngredients((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unit: unit as Unit } : item
      )
    );
  };
  const clearSelection = () => {
    setSelectedIngredients([]);
    setSearchQuery("");
    setFilterType("");
  };
  return (
    <Box padding="$8">
      <SubSectionTitle
        title="Add Ingredients"
        hasButton
        buttonTitle="Add new"
        buttonAction={() => setIsAddModalOpen(true)}
        buttonIcon={Plus}
      />

      {/* Main component content remains the same, just with improved type safety */}
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <TypeFilter
        types={ingredientTypes}
        selectedType={filterType}
        onSelect={setFilterType}
      />

      <HStack justifyContent="space-between" alignItems="center">
        <Text>Selected: {selectedIngredients.length} ingredients</Text>
        {selectedIngredients.length > 0 && (
          <Button
            variant="outline"
            onPress={clearSelection}
            size="sm"
            borderColor="$red600"
          >
            <ButtonText color="$red600">Clear All</ButtonText>
          </Button>
        )}
      </HStack>

      {/* Ingredients List */}
      <IngredientsList
        filteredIngredients={filteredIngredients}
        selectedIngredients={selectedIngredients}
        toggleIngredient={toggleIngredient}
        updateIngredientAmount={updateIngredientAmount}
        updateIngredientUnit={updateIngredientUnit}
        units={[...UNITS]}
      />

      <AddIngredientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddIngredient}
        existingTypes={[]}
      />
    </Box>
  );
};

export default IngredientSelectionPage;
