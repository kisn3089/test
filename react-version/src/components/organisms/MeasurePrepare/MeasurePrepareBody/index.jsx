import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import Button from "../../../atoms/Button";
import Text from "../../../atoms/Text";
import {
  Attention,
  CommentWrapper,
  FaceSection,
  FaceWrapper,
  StyledMeasurePrepareBody,
} from "./styles";
const videoConstraints = {
  width: 320,
  height: 566,
  facingMode: "user",
};

const MeasurePrepareBody = (props) => {
  const { handleClickPrepareBtn } = props;

  return (
    <StyledMeasurePrepareBody>
      <Attention />
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        mirrored={true}
        style={{
          textAlign: "center",
          // height: "100%",
          // width: "100%",
          // objectFit: "fill",
          width: "0%",
          height: "0%",
        }}
      />
      <CommentWrapper>
        <Button
          id="Preparation"
          className="measure"
          content="Preparation"
          handleClick={handleClickPrepareBtn}
        />
        <Text content="Please position your face in the circle." />
      </CommentWrapper>
    </StyledMeasurePrepareBody>
  );
};

export default MeasurePrepareBody;
