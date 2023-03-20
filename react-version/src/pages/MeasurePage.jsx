import React from "react";
import useMeasure from "../hooks/useMeasure";
import MeasureTemplate from "../templates/Measure";

const MeasurePage = () => {
  const { handleClickPrev, handleClickOK } = useMeasure();

  return (
    <MeasureTemplate
      handleClickPrev={handleClickPrev}
      handleClickOK={handleClickOK}
    />
  );
};

export default MeasurePage;
