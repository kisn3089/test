import React from "react";
import useSurveyGender from "../hooks/useSurveyGender";
import SurveyTemplate from "../templates/SurveyGenderTemplate";

const SurveyGenderPage = () => {
  const { validCheck, isActive, handleClickGender, handleClickNext } =
    useSurveyGender();
  return (
    <SurveyTemplate
      validCheck={validCheck}
      isActive={isActive}
      handleClickGender={handleClickGender}
      handleClickNext={handleClickNext}
    />
  );
};

export default SurveyGenderPage;
