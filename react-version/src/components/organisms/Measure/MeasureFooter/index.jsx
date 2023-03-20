import React from "react";
import { useRecoilValue } from "recoil";
import { measureState } from "../../../../store/measuring";
import { prepareState } from "../../../../store/prepare";
import Measuring from "../../../molecules/Measuring";
import Prepare from "../../../molecules/Prepare";
import { MeasureFooterWrapper } from "./style";

const MeasureFooter = () => {
  const prepareRecoil = useRecoilValue(prepareState);
  const measuringRecoil = useRecoilValue(measureState);
  return (
    <MeasureFooterWrapper>
      {prepareRecoil ? <Prepare /> : measuringRecoil ? <Measuring /> : <></>}
    </MeasureFooterWrapper>
  );
};

export default MeasureFooter;
