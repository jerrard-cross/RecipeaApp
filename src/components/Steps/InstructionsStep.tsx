import React, { useState } from "react";
import {
  VStack,
  HStack,
  Box,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  Textarea,
  TextareaInput,
  Button,
  ButtonText,
  Icon,
  Text,
  Pressable,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { GripVertical, Plus, Trash2 } from "lucide-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { useFormContext } from "@/src/providers/FormProvider";
import palette from "@/src/constants/palette";

export const InstructionsStep: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [newInstruction, setNewInstruction] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddInstruction = () => {
    if (!newInstruction.trim()) {
      setError("Instruction cannot be empty");
      return;
    }

    updateFormData({
      instructions: [...formData.instructions, newInstruction.trim()],
    });
    setNewInstruction("");
    setError(null);
  };

  const handleDeleteInstruction = (index: number) => {
    const newInstructions = formData.instructions.filter((_, i) => i !== index);
    updateFormData({ instructions: newInstructions });
  };

  const handleDragEnd = (updatedInstructions: string[]) => {
    updateFormData({ instructions: updatedInstructions });
  };

  const renderInstructionItem = ({
    item,
    drag,
    isActive,
    getIndex,
  }: RenderItemParams<string>) => {
    const [index, setIndex] = useState<number>(0);

    React.useEffect(() => {
      const localIndex = getIndex();

      if (localIndex !== undefined) {
        setIndex(localIndex);
      }
    }, [getIndex]);
    return (
      <ScaleDecorator>
        <Pressable
          onLongPress={drag}
          disabled={isActive}
          opacity={isActive ? 0.5 : 1}
          bg="$white"
          borderRadius="$md"
          borderWidth={1}
          borderColor="$borderLight200"
          mb="$2"
        >
          <HStack space="md" alignItems="flex-start" p="$3">
            <HStack space="sm" alignItems="center">
              <Icon as={GripVertical} size="sm" color="$textLight400" />
              <Text
                fontSize="$lg"
                fontWeight="$medium"
                color="$textLight400"
                width="$8"
              >
                {index + 1}
              </Text>
            </HStack>

            <Text flex={1} fontSize="$md">
              {item}
            </Text>

            <Button
              variant="outline"
              size="sm"
              action="negative"
              onPress={() => {
                handleDeleteInstruction(index);
              }}
            >
              <Icon as={Trash2} size="sm" />
            </Button>
          </HStack>
        </Pressable>
      </ScaleDecorator>
    );
  };

  return (
    <VStack space="lg" p="$4" flex={1}>
      {/* Header */}
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="$lg" fontWeight="$medium">
          Instructions ({formData.instructions.length} steps)
        </Text>
      </HStack>

      {/* Add Instruction Form */}
      <FormControl isInvalid={!!error}>
        <FormControlLabel>
          <FormControlLabelText>Add Step</FormControlLabelText>
        </FormControlLabel>
        <VStack space="sm">
          <Textarea>
            <TextareaInput
              value={newInstruction}
              onChangeText={(text) => {
                setNewInstruction(text);
                setError(null);
              }}
              placeholder="Enter cooking instruction step"
              multiline
              numberOfLines={3}
            />
          </Textarea>
          <Button bgColor={palette.primary} onPress={handleAddInstruction}>
            <ButtonIcon as={Plus} />
            <ButtonText>Add Step</ButtonText>
          </Button>
        </VStack>
        {error ? (
          <FormControlError>
            <FormControlErrorText>{error}</FormControlErrorText>
          </FormControlError>
        ) : (
          <FormControlHelper>
            <FormControlHelperText>
              Add one step at a time. You can reorder steps later.
            </FormControlHelperText>
          </FormControlHelper>
        )}
      </FormControl>

      {/* Instructions List */}
      <Box flex={1}>
        {formData.instructions.length === 0 ? (
          <Box
            p="$4"
            bg="$backgroundLight100"
            borderRadius="$lg"
            borderWidth={1}
            borderColor="$borderLight200"
            alignItems="center"
          >
            <Text color="$textLight500">
              No instructions added yet. Start by adding steps above.
            </Text>
          </Box>
        ) : (
          <GestureHandlerRootView style={{ flex: 1 }}>
            <DraggableFlatList
              data={formData.instructions}
              onDragEnd={({ data }) => handleDragEnd(data)}
              keyExtractor={(item, index) => `instruction-${index}`}
              renderItem={renderInstructionItem}
            />
          </GestureHandlerRootView>
        )}
      </Box>

      {formData.instructions.length > 0 && (
        <Text fontSize="$sm" color="$textLight500" textAlign="center">
          Tip: Long press and drag to reorder steps
        </Text>
      )}
    </VStack>
  );
};
