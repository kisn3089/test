import React from "react";
import Header from "../../components/molecules/Header";
import AgeContent from "../../components/organisms/Age/AgeContent";
import AgeFooter from "../../components/organisms/Age/AgeFooter";
import { AgeTemplateWrapper } from "./style";

const AgeTemplate = (props) => {
  const {
    ageRecoil,
    invalid,
    start,
    handleChangeAge,
    handleClickPrev,
    handleClickNext,
  } = props;

  return (
    <AgeTemplateWrapper>
      <Header content="Information" handleClickPrev={handleClickPrev} />
      <AgeContent
        ageRecoil={ageRecoil}
        invalid={invalid}
        start={start}
        handleChangeAge={handleChangeAge}
      />
      <AgeFooter invalid={invalid} handleClickNext={handleClickNext} />
    </AgeTemplateWrapper>
  );
};

export default AgeTemplate;
