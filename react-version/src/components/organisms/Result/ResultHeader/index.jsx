import React from "react";
import Button from "../../../atoms/Button";
import Text from "../../../atoms/Text";
import { StyledResultHeader } from "./styles";

const ResultHeader = (props) => {
  const { handleClickClose } = props;
  return (
    <StyledResultHeader>
      <Text id="GenderHeader" className="header" content="Health Report" />
      <Button className="close" content="OK" handleClick={handleClickClose} />
    </StyledResultHeader>
  );
};

export default ResultHeader;
