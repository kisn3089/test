import React from "react";
import Text from "../../../atoms/Text";
import { StyledGenderHeader } from "./styles";

const GenderHeader = () => {
  return (
    <StyledGenderHeader>
      <Text id="GenderHeader" className="header" content="Information" />
    </StyledGenderHeader>
  );
};

export default GenderHeader;
