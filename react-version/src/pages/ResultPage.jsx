import React from "react";
import useResult from "../hooks/useResult";
import ResultTemplate from "../templates/Result";

const ResultPage = () => {
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
  } = useResult();

  return (
    <ResultTemplate
      grade={grade}
      gradeDes1={gradeDes1}
      gradeDes2={gradeDes2}
      gradeDes3={gradeDes3}
      faceErr={faceErr}
      position={position}
      position1={position1}
      position2={position2}
      handleClickOK={handleClickOK}
    />
  );
};

export default ResultPage;
