import React from "react";
import Header from "../../components/molecules/Header";
import Modal from "../../components/molecules/Modal";
import MeasureContent from "../../components/organisms/Measure/MeasureContent";
import MeasureFooter from "../../components/organisms/Measure/MeasureFooter";
import { MeasureTemplateWrapper } from "./style";

const MeasureTemplate = (props) => {
  const {
    video,
    canvasElement,
    loading,
    prepare,
    measuring,
    noFace,
    noNetwork,
    timingHist,
    handleClickPrev,
    handleClickOK,
  } = props;

  return (
    <MeasureTemplateWrapper>
      <Header content="Measurement" handleClickPrev={handleClickPrev} />
      <MeasureContent
        video={video}
        canvasElement={canvasElement}
        timingHist={timingHist}
      />
      <MeasureFooter prepare={prepare} measuring={measuring} />
      {noFace || noNetwork ? <Modal handleClickOK={handleClickOK} /> : <></>}
    </MeasureTemplateWrapper>
  );
};

export default MeasureTemplate;
