import Text from "../../atoms/Text";
import {
  ResultDataWrapper,
  ResultBoxWrapper,
  DataWrapper,
  StageWrapper,
} from "./style";
import * as Svg from "./../../icons";

const ResultData = (props) => {
  const { position, position1, position2, dataRecoil, msiScore, psiScore } =
    props;

  return (
    <ResultDataWrapper>
      <Text content="Measuring Results" />
      <ResultBoxWrapper>
        <Text content="Heart Rate" />
        <DataWrapper>
          <Text className="data" content={dataRecoil.hr} />
          <Text content="bpm" />
        </DataWrapper>
        <StageWrapper>
          <Svg.Stage className="stage" />
          <Svg.MyStatus className={`my ${position}`} />
        </StageWrapper>
      </ResultBoxWrapper>
      <ResultBoxWrapper>
        <Text content="MSI (Mental Stress Index)" />
        <DataWrapper>
          <Text className="data" content={Number(msiScore).toFixed(2)} />
        </DataWrapper>
        <StageWrapper>
          <Svg.Stage className="stage" />
          <Svg.MyStatus className={`my ${position1}`} />
        </StageWrapper>
      </ResultBoxWrapper>
      <ResultBoxWrapper>
        <Text content="PSI (Physical Stress Index)" />
        <DataWrapper>
          <Text className="data" content={Number(psiScore).toFixed(2)} />
        </DataWrapper>
        <StageWrapper>
          <Svg.Stage className="stage" />
          <Svg.MyStatus className={`my ${position2}`} />
        </StageWrapper>
      </ResultBoxWrapper>
    </ResultDataWrapper>
  );
};

export default ResultData;
