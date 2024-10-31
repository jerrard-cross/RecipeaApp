import React from "react";
import {
  Box,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  FormControl,
  Input,
  InputField,
  HStack,
  VStack,
  Text,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Icon,
} from "@gluestack-ui/themed";
import { Check, ChevronDown } from "lucide-react-native";
import { Ingredient, SelectedIngredient, Unit } from "@/src/lib/types";

interface IngredientItemProps {
  item: Ingredient;
  selectedIngredients: SelectedIngredient[];
  units: Unit[];
  onToggle: (ingredient: Ingredient) => void;
  onAmountChange: (id: string, amount: string) => void;
  onUnitChange: (id: string, unit: Unit) => void;
}

const IngredientItem = ({
  item,
  units,
  selectedIngredients,
  onToggle,
  onAmountChange,
  onUnitChange,
}: IngredientItemProps) => {
  const isSelected = selectedIngredients.some(
    (ingredient: Ingredient) => ingredient.id === item.id
  );
  const selectedItem = selectedIngredients.find(
    (ingredient: Ingredient) => ingredient.id === item.id
  );
  return (
    <Box
      marginBottom="$2"
      padding="$3"
      borderRadius="$md"
      borderWidth="$1"
      borderColor={isSelected ? "$green600" : "$borderLight300"}
      backgroundColor={isSelected ? "$green100" : "$white"}
    >
      <VStack space="sm">
        <HStack space="md" alignItems="center">
          <Checkbox
            value={item.id}
            isChecked={isSelected}
            onChange={() => onToggle(item)}
            size="md"
          >
            <CheckboxIndicator>
              <CheckboxIcon as={Check} />
            </CheckboxIndicator>
            <CheckboxLabel>
              <VStack>
                <Text fontWeight="$medium">{item.name}</Text>
                <Text size="sm" color="$textLight500">
                  {item.type}
                </Text>
              </VStack>
            </CheckboxLabel>
          </Checkbox>
        </HStack>

        {isSelected && (
          <HStack space="md" marginLeft="$8">
            <FormControl flex={1}>
              <Input>
                <InputField
                  placeholder="Amount"
                  keyboardType="numeric"
                  value={selectedItem ? selectedItem.amount : ""}
                  onChangeText={(value) => onAmountChange(item.id, value)}
                />
              </Input>
            </FormControl>

            <FormControl flex={1}>
              <Select
                selectedValue={selectedItem ? selectedItem.unit : ""}
                onValueChange={(value) => onUnitChange(item.id, value as Unit)}
              >
                <SelectTrigger>
                  <SelectInput placeholder="Select unit" />
                  <SelectIcon>
                    <Icon as={ChevronDown} />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {units.map((unit) => (
                      <SelectItem key={unit} label={unit} value={unit} />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default IngredientItem;
