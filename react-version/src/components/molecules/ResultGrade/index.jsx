import React from "react";
import Text from "../../atoms/Text";
import { CommentWrapper, StyledResultGrade } from "./styles";

const ResultGrade = (props) => {
  const { gradeScore, grade, comment1, comment2, comment3 } = props;

  return (
    <StyledResultGrade>
      <Text
        id="result"
        className="result"
        content="Your total Health Result is"
      />
      <Text id="grade" className={`grade ${gradeScore}`} content={grade} />
      <CommentWrapper>
        <Text className="comment" content={comment1} />
        <Text className="comment" content={comment2} />
        <Text className="comment" content={comment3} />
      </CommentWrapper>
    </StyledResultGrade>
  );
};

export default ResultGrade;
