import React from "react";
import Header from "../../components/molecules/Header";
import ResultContent from "../../components/organisms/ResultContent";
import { ResultTemplateWrapper } from "./style";

const ResultTemplate = (props) => {
  const {
    grade,
    gradeDes1,
    gradeDes2,
    gradeDes3,
    faceErr,
    position,
    position1,
    position2,
    handleClickOK,
  } = props;

  return (
    <ResultTemplateWrapper>
      <Header
        content="Health Report"
        option="result"
        handleClickOK={handleClickOK}
      />
      <ResultContent
        grade={grade}
        gradeDes1={gradeDes1}
        gradeDes2={gradeDes2}
        gradeDes3={gradeDes3}
        faceErr={faceErr}
        position={position}
        position1={position1}
        position2={position2}
      />
    </ResultTemplateWrapper>
  );
};

export default ResultTemplate;
