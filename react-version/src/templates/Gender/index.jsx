import React from "react";
import Header from "../../components/molecules/Header";
import GenderContent from "../../components/organisms/Gender/GenderContent";
import { GederTemplateWrapper } from "./style";

const GenderTemplate = () => {
  return (
    <GederTemplateWrapper>
      <Header option="main" content="Information" />
      <GenderContent />
    </GederTemplateWrapper>
  );
};

export default GenderTemplate;
