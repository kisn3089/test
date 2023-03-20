import React from "react";
import { useRecoilValue } from "recoil";
import Header from "../../components/molecules/Header";
import Modal from "../../components/molecules/Modal";
import MeasureContent from "../../components/organisms/Measure/MeasureContent";
import MeasureFooter from "../../components/organisms/Measure/MeasureFooter";
import { faceState } from "../../store/face";
import { networkState } from "../../store/network";
import { MeasureTemplateWrapper } from "./style";

const MeasureTemplate = (props) => {
  const { handleClickPrev, handleClickOK } = props;
  const faceRecoil = useRecoilValue(faceState);
  const networkRecoil = useRecoilValue(networkState);

  return (
    <MeasureTemplateWrapper>
      <Header content="Measurement" handleClickPrev={handleClickPrev} />
      <MeasureContent />
      <MeasureFooter />
      {faceRecoil || networkRecoil ? (
        faceRecoil ? (
          <Modal
            text1="No faces are detected."
            text2="Please try again."
            handleClickOK={handleClickOK}
          />
        ) : (
          <Modal
            text1="The network is"
            text2="currently unstable."
            handleClickOK={handleClickOK}
          />
        )
      ) : (
        <></>
      )}
    </MeasureTemplateWrapper>
  );
};

export default MeasureTemplate;
