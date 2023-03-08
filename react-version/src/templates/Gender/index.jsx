import React from "react";
import Header from "../../components/molecules/Header";
import GenderContent from "../../components/organisms/Gender/GenderContent";
import GenderFooter from "../../components/organisms/Gender/GenderFooter";
import { GederTemplateWrapper } from "./style";

const GenderTemplate = (props) => {
  const { genderRecoil, handleClickGender, handleClickNext } = props;

  return (
    <GederTemplateWrapper>
      <Header option="main" content="Information" />
      <GenderContent
        genderRecoil={genderRecoil}
        handleClickGender={handleClickGender}
      />
      <GenderFooter
        genderRecoil={genderRecoil}
        handleClickNext={handleClickNext}
      />
    </GederTemplateWrapper>
  );
};

export default GenderTemplate;
