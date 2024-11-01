import React from "react";
import {
  FormControl,
  Input,
  InputField,
  InputIcon,
  Icon,
  View,
} from "@gluestack-ui/themed";
import { Search } from "lucide-react-native";
import useDebounce from "../hooks/useDebounce";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChangeText, placeholder }: SearchBarProps) => {
  return (
    <FormControl>
      <Input rounded={"$full"}>
        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
        <View mr={"$4"} justifyContent="center">
          <InputIcon>
            <Icon as={Search} />
          </InputIcon>
        </View>
      </Input>
    </FormControl>
  );
};

export default SearchBar;
