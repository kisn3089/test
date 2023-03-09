import React, { useState } from "react";
import { MeasureContentWrapper, VideoWrapper } from "./style";
import Webcam from "react-webcam";
import FaceCircle from "../../../molecules/FaceCircle";

const MeasureContent = (props) => {
  const { video, canvasElement } = props;

  const [cameraReady, setCameraReady] = useState(false);
  const webcamRef = React.useRef(null);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  return (
    <MeasureContentWrapper>
      <VideoWrapper>
        <Webcam
          audio={false}
          width="100%"
          height="100%"
          ref={video}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={() => {
            setCameraReady(true);
          }}
        />
        <canvas
          className="output_canvas"
          width="640px"
          height="480px"
          ref={canvasElement}
        ></canvas>
      </VideoWrapper>
      <FaceCircle />
    </MeasureContentWrapper>
  );
};

export default MeasureContent;
