import React from "react";
import useMeasurement from "../hooks/useMeasurement";
import MeasureTemplate from "../templates/MeasureTemplate";

const MeasurePage = () => {
  const {
    measuring,
    noDetected,
    noNetwork,
    ageRecoil,
    genderRecoil,
    getDataFnc,
    handleMeasuring,
    handleNetworkErr,
    handleDetectedErr,
    handleClickErrBtn,
    handleClickPrev,
  } = useMeasurement();
  return (
    <MeasureTemplate
      measuring={measuring}
      noDetected={noDetected}
      noNetwork={noNetwork}
      ageRecoil={ageRecoil}
      genderRecoil={genderRecoil}
      getDataFnc={getDataFnc}
      handleMeasuring={handleMeasuring}
      handleNetworkErr={handleNetworkErr}
      handleDetectedErr={handleDetectedErr}
      handleClickErrBtn={handleClickErrBtn}
      handleClickPrev={handleClickPrev}
    />
  );
};

export default MeasurePage;
