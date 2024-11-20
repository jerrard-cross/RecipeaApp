import React from "react";
import {
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Text,
} from "@gluestack-ui/themed";
import { LucideIcon } from "lucide-react-native";

type SubSectionTitleProps = {
  title: string;
  hasButton?: boolean;
  buttonTitle?: string;
  buttonAction?: () => void;
  buttonIcon?: LucideIcon;
};

const SubSectionTitle = ({
  title,
  hasButton,
  buttonTitle,
  buttonIcon,
  buttonAction,
}: SubSectionTitleProps) => {
  return (
    <HStack justifyContent="space-between" alignItems="center" my={"$4"}>
      <Text size="xl" fontWeight="$bold">
        {title}
      </Text>

      {hasButton && (
        <Button
          onPress={() => buttonAction && buttonAction()}
          backgroundColor="$green600"
          size="sm"
        >
          {buttonIcon && (
            <ButtonIcon as={buttonIcon} color="$white" marginRight="$1" />
          )}
          <ButtonText>{buttonTitle}</ButtonText>
        </Button>
      )}
    </HStack>
  );
};

export default SubSectionTitle;
