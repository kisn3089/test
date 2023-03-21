import React from "react";
import TotalGrade from "../../molecules/TotalGrade";
import ResultData from "../../molecules/ResultData";
import { ResultContentWrapper } from "./style";

const ResultContent = (props) => {
  const {
    grade,
    gradeDes1,
    gradeDes2,
    gradeDes3,
    faceErr,
    position,
    position1,
    position2,
    dataRecoil,
    msiScore,
    psiScore,
  } = props;

  return (
    <ResultContentWrapper>
      <TotalGrade
        grade={grade}
        gradeDes1={gradeDes1}
        gradeDes2={gradeDes2}
        gradeDes3={gradeDes3}
        faceErr={faceErr}
      />
      <ResultData
        position={position}
        position1={position1}
        position2={position2}
        dataRecoil={dataRecoil}
        msiScore={msiScore}
        psiScore={psiScore}
      />
    </ResultContentWrapper>
  );
};

export default ResultContent;
