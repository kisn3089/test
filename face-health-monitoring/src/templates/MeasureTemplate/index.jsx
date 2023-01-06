import React from "react";
import MeasureBody from "../../components/organisms/Measurement/MeasureBody";
import MeasureHeader from "../../components/organisms/Measurement/MeasureHeader";
import { StyledMeasure } from "./styles";

const MeasureTemplate = (props) => {
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
  } = props;

  return (
    <StyledMeasure>
      <MeasureHeader handleClickPrev={handleClickPrev} />
      <MeasureBody
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
      />
    </StyledMeasure>
  );
};

export default MeasureTemplate;
