import React from "react";
import useSurveyAge from "../hooks/useSurveyAge";
import SurveyAgeTemplate from "../templates/SurveyAgeTemplate";

const SurveyAgePage = () => {
  const {
    ageRecoil,
    validCheck,
    handleChangeAge,
    handleClickPrev,
    handleClickNext,
  } = useSurveyAge();

  return (
    <SurveyAgeTemplate
      ageRecoil={ageRecoil}
      validCheck={validCheck}
      handleChangeAge={handleChangeAge}
      handleClickPrev={handleClickPrev}
      handleClickNext={handleClickNext}
    />
  );
};

export default SurveyAgePage;
