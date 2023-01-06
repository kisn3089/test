import React from "react";
import GenderBody from "../../components/organisms/SurveyGender/GenderBody";
import GenderFooter from "../../components/organisms/SurveyGender/GenderFooter";
import GenderHeader from "../../components/organisms/SurveyGender/GenderHeader";
import { StyledSurveyGender } from "./styles";

const SurveyGenderTemplate = (props) => {
  const { validCheck, isActive, handleClickGender, handleClickNext } = props;
  return (
    <StyledSurveyGender>
      <GenderHeader />
      <GenderBody isActive={isActive} handleClickGender={handleClickGender} />
      <GenderFooter validCheck={validCheck} handleClickNext={handleClickNext} />
    </StyledSurveyGender>
  );
};

export default SurveyGenderTemplate;
