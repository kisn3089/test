import React from "react";
import Text from "../../../atoms/Text";
import ResultGrade from "../../../molecules/ResultGrade";
import ResultRate from "../../../molecules/ResultRate";
import { StyledResultBody, ContentsWrapper } from "./styles";

const ResultBody = (props) => {
  const {
    hrRecoil,
    psiRecoil,
    msiRecoil,
    respRecoil,
    hrLevel,
    psiLevel,
    msiLevel,
    respLevel,
    totalLevel,
    comment1,
    comment2,
    comment3,
  } = props;

  let grade;

  if (totalLevel === "one") {
    grade = "Grade 1";
  } else if (totalLevel === "two") {
    grade = "Grade 2";
  } else if (totalLevel === "three") {
    grade = "Grade 3";
  } else if (totalLevel === "four") {
    grade = "Grade 4";
  } else if (totalLevel === "five") {
    grade = "Grade 5";
  }

  console.log(
    hrRecoil,
    psiRecoil,
    msiRecoil,
    respRecoil,
    hrLevel,
    psiLevel,
    msiLevel,
    respLevel,
    totalLevel,
    comment1,
    comment2,
    comment3
  );

  return (
    <StyledResultBody>
      <ContentsWrapper>
        <Text
          id="ResultBody"
          className="Resultgrade"
          content="Total Health Result"
        />
        <ResultGrade
          gradeScore={totalLevel}
          grade={grade}
          comment1={comment1}
          comment2={comment2}
          comment3={comment3}
        />
        <Text
          id="ResultBody"
          className="Resultrate"
          content="Measuring Results"
        />
        <ResultRate
          valid="HR"
          subject="Heart Rate"
          score={hrRecoil}
          status={hrLevel}
        />
        <ResultRate
          valid="Resp"
          subject="Respiratory Rate"
          score={respRecoil}
          status={respLevel}
        />
        <ResultRate
          subject="MSI (Mental Stress Index)"
          score={msiRecoil}
          status={msiLevel}
        />
        <ResultRate
          subject="PSI (Physical Stress Index)"
          score={psiRecoil}
          status={psiLevel}
        />
      </ContentsWrapper>
    </StyledResultBody>
  );
};

export default ResultBody;
