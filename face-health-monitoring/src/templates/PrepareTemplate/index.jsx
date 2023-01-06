import React from "react";
import MeasurePrepareBody from "../../components/organisms/MeasurePrepare/MeasurePrepareBody";
import MeasurePrepareHeader from "../../components/organisms/MeasurePrepare/MeasurePrepareHeader";
import { StyledPrepare } from "./styles";

const PrepareTemplate = (props) => {
  const { handleClickPrev, handleClickPrepareBtn } = props;

  return (
    <StyledPrepare>
      <MeasurePrepareHeader handleClickPrev={handleClickPrev} />
      <MeasurePrepareBody handleClickPrepareBtn={handleClickPrepareBtn} />
    </StyledPrepare>
  );
};

export default PrepareTemplate;
