import { FlatList } from "@gluestack-ui/themed";
import { Ingredient, SelectedIngredient, Unit } from "../lib/types";
import IngredientItem from "./IngredientsItem";

type IngredientItemProps = {
  filteredIngredients: Ingredient[];
  selectedIngredients: SelectedIngredient[];
  toggleIngredient: (item: Ingredient) => void;
  updateIngredientAmount: (id: string, value: string) => void;
  updateIngredientUnit: (id: string, value: string) => void;
  units: Unit[];
};

const IngredientsList = ({
  filteredIngredients,
  selectedIngredients,
  toggleIngredient,
  updateIngredientAmount,
  updateIngredientUnit,
  units,
}: IngredientItemProps) => {
  return (
    <FlatList
      h="$full"
      data={filteredIngredients}
      renderItem={({ item }: any) => (
        <IngredientItem
          item={item}
          onToggle={toggleIngredient}
          onAmountChange={updateIngredientAmount}
          onUnitChange={updateIngredientUnit}
          selectedIngredients={selectedIngredients}
          units={units}
        />
      )}
      keyExtractor={(item) => (item as Ingredient).id as string}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default IngredientsList;
