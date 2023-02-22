import React from "react";
import Button from "../../../atoms/Button";
import Text from "../../../atoms/Text";
import { StyledGenderBody } from "./styles";

const GenderBody = (props) => {
  const { isActive, handleClickGender } = props;

  return (
    <StyledGenderBody>
      <Text id="GenderBody" className="body" content="What is your gender?" />
      <Button
        id="Male"
        className={isActive === "Male" ? "selected" : ""}
        content="Male"
        handleClick={handleClickGender}
      />
      <Button
        id="Female"
        className={isActive === "Female" ? "selected" : ""}
        content="Female"
        handleClick={handleClickGender}
      />
    </StyledGenderBody>
  );
};

export default GenderBody;
