import React from "react";
import Text from "../../../atoms/Text";
import { StyledMeasureHeader } from "./styles";
import * as Svg from "./../../../icons/index";

const MeasureHeader = (props) => {
  const { handleClickPrev } = props;

  return (
    <StyledMeasureHeader>
      <Svg.PrevArrow onClick={handleClickPrev} />
      <Text id="MeasureHeader" className="header" content="Measurement" />
    </StyledMeasureHeader>
  );
};

export default MeasureHeader;
