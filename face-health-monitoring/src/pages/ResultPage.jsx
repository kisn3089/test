import React from "react";
import useResult from "../hooks/useResult";
import ResultTemplate from "../templates/ResultTemplate";

const ResultPage = () => {
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
    handleClickClose,
  } = useResult();
  return (
    <ResultTemplate
      hrRecoil={hrRecoil}
      psiRecoil={psiRecoil}
      msiRecoil={msiRecoil}
      respRecoil={respRecoil}
      hrLevel={hrLevel}
      psiLevel={psiLevel}
      msiLevel={msiLevel}
      respLevel={respLevel}
      totalLevel={totalLevel}
      comment1={comment1}
      comment2={comment2}
      comment3={comment3}
      handleClickClose={handleClickClose}
    />
  );
};

export default ResultPage;
