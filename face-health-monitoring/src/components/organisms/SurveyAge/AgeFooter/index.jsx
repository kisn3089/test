import React from "react";
import Button from "../../../atoms/Button";
import { StyledAgeFooter } from "./styles";

const AgeFooter = (props) => {
  const { validCheck = true, handleClickNext } = props;
  return (
    <StyledAgeFooter>
      <Button
        id="AgeFooter"
        className={!validCheck ? "next selected" : "next"}
        content="Start Measurement"
        handleClick={!validCheck ? handleClickNext : () => {}}
      />
    </StyledAgeFooter>
  );
};

export default AgeFooter;
