import React from "react";
import Header from "../../components/molecules/Header";
import AgeContent from "../../components/organisms/Age/AgeContent";
import AgeFooter from "../../components/organisms/Age/AgeFooter";
import { AgeTemplateWrapper } from "./style";

const AgeTemplate = () => {
  return (
    <AgeTemplateWrapper>
      <Header content="Information" />
      <AgeContent />
      <AgeFooter />
    </AgeTemplateWrapper>
  );
};

export default AgeTemplate;
