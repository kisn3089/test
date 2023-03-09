import React from "react";
import useMeasure from "../hooks/useMeasure";
import MeasureTemplate from "../templates/Measure";

const MeasurePage = () => {
  const {
    video,
    canvasElement,
    loading,
    prepare,
    measuring,
    noFace,
    noNetwork,
    timingHist,
    handleClickPrev,
    handleClickOK,
  } = useMeasure();

  return (
    <MeasureTemplate
      video={video}
      canvasElement={canvasElement}
      loading={loading}
      prepare={prepare}
      measuring={measuring}
      noFace={noFace}
      noNetwork={noNetwork}
      timingHist={timingHist}
      handleClickPrev={handleClickPrev}
      handleClickOK={handleClickOK}
    />
  );
};

export default MeasurePage;
