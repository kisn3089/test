import React from "react";
import Input from "../../../atoms/Input";
import Text from "../../../atoms/Text";
import { StyledAgeBody } from "./styles";

const AgeBody = (props) => {
  const { ageRecoil, validCheck, handleChangeAge } = props;
  return (
    <StyledAgeBody>
      <Text id="AgeBody" className="body" content="How old are you?" />
      <Input id="Age" value={ageRecoil} handleChange={handleChangeAge} />
      {validCheck && (
        <Text className="valid" content="Please enter a valid number." />
      )}
    </StyledAgeBody>
  );
};

export default AgeBody;
