import React from "react";
import useAge from "../hooks/useAge";
import AgeTemplate from "../templates/Age";

const AgePage = () => {
  const {
    ageRecoil,
    invalid,
    start,
    handleChangeAge,
    handleClickPrev,
    handleClickNext,
  } = useAge();

  return (
    <AgeTemplate
      ageRecoil={ageRecoil}
      invalid={invalid}
      start={start}
      handleChangeAge={handleChangeAge}
      handleClickPrev={handleClickPrev}
      handleClickNext={handleClickNext}
    />
  );
};

export default AgePage;
