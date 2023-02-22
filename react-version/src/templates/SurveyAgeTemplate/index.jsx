import React from "react";
import AgeBody from "../../components/organisms/SurveyAge/AgeBody";
import AgeFooter from "../../components/organisms/SurveyAge/AgeFooter";
import AgeHeader from "../../components/organisms/SurveyAge/AgeHeader";
import { StyledSurveyAge } from "./styles";

const SurveyAgeTemplate = (props) => {
  const {
    ageRecoil,
    validCheck,
    handleChangeAge,
    handleClickPrev,
    handleClickNext,
  } = props;
  return (
    <StyledSurveyAge>
      <AgeHeader handleClickPrev={handleClickPrev} />
      <AgeBody
        ageRecoil={ageRecoil}
        validCheck={validCheck}
        handleChangeAge={handleChangeAge}
      />
      <AgeFooter validCheck={validCheck} handleClickNext={handleClickNext} />
    </StyledSurveyAge>
  );
};

export default SurveyAgeTemplate;
