import React from "react";
import ResultBody from "../../components/organisms/Result/ResultBody";
import ResultHeader from "../../components/organisms/Result/ResultHeader";
import { StyledResult } from "./styles";

const ResultTemplate = (props) => {
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
  } = props;
  return (
    <StyledResult>
      <ResultHeader handleClickClose={handleClickClose} />
      <ResultBody
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
      />
    </StyledResult>
  );
};

export default ResultTemplate;
