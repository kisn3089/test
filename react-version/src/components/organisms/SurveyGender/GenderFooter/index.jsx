import React from "react";
import Button from "../../../atoms/Button";
import { StyledGenderFooter } from "./styles";

const GenderFooter = (props) => {
  const { validCheck, handleClickNext } = props;

  return (
    <StyledGenderFooter>
      <Button
        id="GenderFooter"
        className={validCheck ? "next selected" : "next"}
        content="Next"
        handleClick={validCheck ? handleClickNext : () => {}}
      />
    </StyledGenderFooter>
  );
};

export default GenderFooter;
