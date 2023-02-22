import React, { useRef, useState } from "react";
import Button from "../../../atoms/Button";
import Text from "../../../atoms/Text";
import {
  ErrBox,
  ErrMessage,
  MeasuringCommentWrapper,
  Modal,
  PrepareCommentWrapper,
  StyledMeasureBody,
} from "./styles";
import Webcam from "react-webcam";
import {
  FaceMesh,
  FACEMESH_RIGHT_EYE,
  FACEMESH_LEFT_EYE,
  FACEMESH_FACE_OVAL,
  FACEMESH_LIPS,
} from "@mediapipe/face_mesh";
import "react-circular-progressbar/dist/styles.css";
import CryptoJS from "crypto-js";
import Animation from "../../../molecules/Animation";

const videoConstraints = {
  width: 320,
  height: 566,
  facingMode: "user",
};

const url =
  "https://siigjmw19n.apigw.ntruss.com/face_health_estimate/v1/calculate_face_ppg_stress_cors";
const uri = "/face_health_estimate/v1/calculate_face_ppg_stress_cors";

let mean_red = [];
let mean_green = [];
let mean_blue = [];
// second * 30
const maxHistLen = 900;
let timingHist = [];
let frame = 0;

let boxLeft;
let boxTop;
let boxWidth;
let boxHeight;

let timestamp = 0;

let lastPosition;
let lastYPosition;
let positionErr = 0;
let yPositionErr = 0;

const MeasureBody = (props) => {
  const {
    measuring,
    noDetected,
    noNetwork,
    ageRecoil,
    genderRecoil,
    getDataFnc,
    handleMeasuring,
    handleNetworkErr,
    handleDetectedErr,
    handleClickErrBtn,
  } = props;
  const [tpercentage, setPercentage] = useState(0);

  const webcamRef = useRef(null);
  const canvasReference = useRef(null);
  const [setCameraReady] = useState(false);
  let canvasCtx;

  const videoElement = document.getElementsByClassName("input_video")[0];
  const canvasElement = document.createElement("canvas");

  return (
    <StyledMeasureBody>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        mirrored={true}
        style={{
          textAlign: "center",
          height: "100%",
          width: "100%",
          objectFit: "fill",
          // width: "0%",
          // height: "0%",
        }}
        onUserMedia={() => {
          console.log("webcamRef.current", webcamRef.current);
          setCameraReady(true);
        }}
      />
      <canvas
        ref={canvasReference}
        style={{
          position: "absolute",
          textAlign: "center",
          zIndex: 20,
          right: 0,
          height: "100%",
          width: "100%",
          objectFit: "fill",
          display: "none",
        }}
      />
      {!measuring && (
        <PrepareCommentWrapper>
          <Button id="Preparation" className="measure" content="Preparation" />
          <Text content="Please position your face in the circle." />
        </PrepareCommentWrapper>
      )}
      {measuring && (
        <MeasuringCommentWrapper>
          <Button id="Measuring" className="measure" content="Measuring" />
          <Text content="Measuring now... Don’t talk or move." />
          <Animation />
        </MeasuringCommentWrapper>
      )}
      {(noDetected || noNetwork) && (
        <Modal id="Modal" class="modal">
          {noDetected && (
            <ErrBox class="detected">
              <ErrMessage class="message">
                <Text className="err" content="No faces are detected." />
                <Text className="err" content="Please try again.." />
              </ErrMessage>
              <Button
                class="err-btn"
                content="OK"
                handleClick={handleClickErrBtn()}
              />
            </ErrBox>
          )}
          {noNetwork && (
            <ErrBox>
              <ErrMessage>
                <Text className="err" content="The network is" />
                <Text className="err" content="currently unstable." />
              </ErrMessage>
              <Button
                class="err-btn"
                content="OK"
                handleClick={handleClickErrBtn()}
              />
            </ErrBox>
          )}
        </Modal>
      )}
    </StyledMeasureBody>
  );
};

export default MeasureBody;

function makeSignature() {
  var space = " "; // one space
  var newLine = "\n"; // new line
  var method = "POST"; // method
  var urls = uri; // url (include query string)
  timestamp = String(new Date().getTime()); // current timestamp (epoch)
  var accessKey = "PbDvaXxkTaHf19QGViU1"; // access key id (from portal or sub account)
  var secretKey = "HOAg4vr7bjzHr4OvMeAvw70Ae8nNKa6ctudDJuJy"; // secret key (from portal or sub account)

  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(urls);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);

  var hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
}
