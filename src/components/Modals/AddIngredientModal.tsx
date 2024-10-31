import React, { useState } from "react";
import {
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  VStack,
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
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Icon,
  CloseIcon,
  Text,
} from "@gluestack-ui/themed";
import { ChevronDown } from "lucide-react-native";
import { NewIngredient } from "@/src/lib/types";

interface AddIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (ingredient: NewIngredient) => void;
  existingTypes: string[];
}

export const AddIngredientModal: React.FC<AddIngredientModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  existingTypes,
}) => {
  const [newIngredient, setNewIngredient] = useState<NewIngredient>({
    name: "",
    type: "",
  });
  const [customType, setCustomType] = useState<string>("");
  const [isCustomType, setIsCustomType] = useState<boolean>(false);

  const handleSubmit = (): void => {
    const finalType = isCustomType ? customType : newIngredient.type;
    onAdd({
      name: newIngredient.name.trim(),
      type: finalType.trim(),
    });
    resetForm();
  };

  const resetForm = (): void => {
    setNewIngredient({ name: "", type: "" });
    setCustomType("");
    setIsCustomType(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={resetForm}>
      {/* Modal content remains the same, just with improved type safety */}
    </Modal>
  );
};
