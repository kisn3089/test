import React from "react";
import Text from "../../../atoms/Text";
import { StyledAgeHeader } from "./styles";
import * as Svg from "./../../../icons/index";

const AgeHeader = (props) => {
  const { handleClickPrev } = props;

  return (
    <StyledAgeHeader>
      <Svg.PrevArrow onClick={handleClickPrev} />
      <Text id="AgeHeader" className="header" content="Information" />
    </StyledAgeHeader>
  );
};

export default AgeHeader;
