import React from "react";
import Text from "../../atoms/Text";
import { TotalGradeWrapper, GradeBoxWrapper, TextWrapper } from "./style";

const TotalGrade = (props) => {
  const { grade, gradeDes1, gradeDes2, gradeDes3, faceErr } = props;

  return (
    <TotalGradeWrapper>
      <Text content="Total Health Result" />
      {faceErr ? (
        <Text
          className="invalid"
          content="Face is shaking a lot. Results are not reliable."
        />
      ) : (
        <></>
      )}
      <GradeBoxWrapper>
        <Text content="Your total Health Result is" />
        <Text className={`grade grade${grade}`} content={`Grade ${grade}`} />
        <TextWrapper>
          <Text content={gradeDes1} />
          <Text content={gradeDes2} />
          <Text content={gradeDes3} />
        </TextWrapper>
      </GradeBoxWrapper>
    </TotalGradeWrapper>
  );
};

export default TotalGrade;
