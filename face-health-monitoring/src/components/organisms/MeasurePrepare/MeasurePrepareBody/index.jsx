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
        style={{
          position: "absolute",
          textAlign: "center",
          zindex: 8,
          right: 0,
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      />
      <FaceSection>
        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          style={{
            position: "absolute",
            textAlign: "center",
            top: "-10.494752623688155vh",
            left: "56.22188905547227vh",
            zindex: 8,
            width: "56.22188905547227vh",
            minWidth: "375px",
            height: "calc(100vh - 9.745127436281859vh)",
            minHeight: "calc(100vh - 64px)",
            objectFit: "cover",
          }}
        />
      </FaceSection>
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
