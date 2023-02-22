import React from "react";
import Text from "../../../atoms/Text";
import { StyledMeasurePrepareHeader } from "./styles";
import * as Svg from "./../../../icons/index";

const MeasurePrepareHeader = (props) => {
  const { handleClickPrev } = props;

  return (
    <StyledMeasurePrepareHeader>
      <Svg.PrevArrow onClick={handleClickPrev} />
      <Text
        id="MeasurePrepareHeader"
        className="header"
        content="Measurement"
      />
    </StyledMeasurePrepareHeader>
  );
};

export default MeasurePrepareHeader;
