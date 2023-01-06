import React from "react";
import Text from "../../atoms/Text";
import { MyStatus, ScoreWraaper, StatusBar, StyledResultRate } from "./styles";
import * as Svg from "./../../icons/index";

const ResultRate = (props) => {
  const { valid, subject, score, status } = props;
  return (
    <StyledResultRate>
      <Text id="result" className="result" content={subject} />
      <ScoreWraaper>
        <Text id="score" className="score" content={score} />
        {valid === "HR" ? (
          <Text id="unit" className="unit" content="bpm" />
        ) : valid === "Resp" ? (
          <Text id="unit" className="unit" content="brpm" />
        ) : (
          <></>
        )}
      </ScoreWraaper>
      <StatusBar>
        <Svg.StageBar />
        <MyStatus className={status}>
          <Svg.MyStatus />
        </MyStatus>
      </StatusBar>
    </StyledResultRate>
  );
};

export default ResultRate;
