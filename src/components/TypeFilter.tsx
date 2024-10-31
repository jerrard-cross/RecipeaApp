import React from "react";
import { HStack, Pressable, Text } from "@gluestack-ui/themed";

interface TypeFilterProps {
  types: string[];
  selectedType: string;
  onSelect: (type: string) => void;
}

const TypeFilter = ({ types, selectedType, onSelect }: TypeFilterProps) => (
  <HStack space="sm" flexWrap="wrap">
    <Pressable
      onPress={() => onSelect("")}
      padding="$2"
      borderRadius="$md"
      backgroundColor={selectedType === "" ? "$green600" : "$gray100"}
    >
      <Text color={selectedType === "" ? "$white" : "$textDark900"}>All</Text>
    </Pressable>
    {types.map((type) => (
      <Pressable
        key={type}
        onPress={() => onSelect(type)}
        padding="$2"
        borderRadius="$md"
        backgroundColor={selectedType === type ? "$green600" : "$gray100"}
      >
        <Text color={selectedType === type ? "$white" : "$textDark900"}>
          {type}
        </Text>
      </Pressable>
    ))}
  </HStack>
);

export default TypeFilter;
