import React from "react";
import useGender from "../hooks/useGender";
import GenderTemplate from "../templates/Gender";

const GenderPage = () => {
  const { genderRecoil, handleClickGender, handleClickNext } = useGender();

  return (
    <GenderTemplate
      genderRecoil={genderRecoil}
      handleClickGender={handleClickGender}
      handleClickNext={handleClickNext}
    />
  );
};

export default GenderPage;
