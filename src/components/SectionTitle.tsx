import { View, Text } from "react-native";
import React from "react";
import { Heading } from "@gluestack-ui/themed";

type SectionTitleProps = {
  title: string;
};

const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <Heading fontSize={"$2xl"} mb={"$3"} fontWeight={"$semibold"}>
      {title}
    </Heading>
  );
};

export default SectionTitle;
