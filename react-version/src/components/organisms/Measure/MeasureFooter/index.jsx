import React from "react";
import Measuring from "../../../molecules/Measuring";
import Prepare from "../../../molecules/Prepare";
import { MeasureFooterWrapper } from "./style";

const MeasureFooter = (props) => {
  const { prepare, measuring } = props;
  return (
    <MeasureFooterWrapper>
      {prepare ? <Prepare /> : measuring ? <Measuring /> : <></>}
    </MeasureFooterWrapper>
  );
};

export default MeasureFooter;
