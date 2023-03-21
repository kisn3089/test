import React, { useRef, useEffect, useState } from "react";
import { MeasureContentWrapper, VideoWrapper } from "./style";
import Webcam from "react-webcam";
import FaceCircle from "../../../molecules/FaceCircle";
import CryptoJS from "crypto-js";
import { Camera } from "@mediapipe/camera_utils";
import {
  FaceMesh,
  FACEMESH_RIGHT_EYE,
  FACEMESH_LEFT_EYE,
  FACEMESH_FACE_OVAL,
  FACEMESH_LIPS,
} from "@mediapipe/face_mesh";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { confidenceLevelState } from "../../../../store/confidenceLevel";
import { ageState } from "../../../../store/age";
import { genderState } from "../../../../store/gender";
import { dataState } from "../../../../store/data";
import { loadingState } from "../../../../store/loading";
import { prepareState } from "../../../../store/prepare";
import { measureState } from "../../../../store/measuring";
import { faceState } from "../../../../store/face";
import { networkState } from "../../../../store/network";
import { FaceCircleWrapper } from "../../../molecules/FaceCircle/style";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import CircleProgress from "js-circle-progress";
import "react-circular-progressbar/dist/styles.css";
require("@tensorflow/tfjs-backend-wasm");

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const MeasureContent = () => {
  const setLoding = useSetRecoilState(loadingState);
  const setPepare = useSetRecoilState(prepareState);
  const setMeasuring = useSetRecoilState(measureState);
  const setNoFace = useSetRecoilState(faceState);
  const setNoNetwork = useSetRecoilState(networkState);
  const setConfidenceLevel = useSetRecoilState(confidenceLevelState);
  const ageRecoil = useRecoilValue(ageState);
  const genderRecoil = useRecoilValue(genderState);
  const setDataRecoil = useSetRecoilState(dataState);

  const navigator = useNavigate();

  const webcamRef = useRef(null);
  const canvasReference = useRef(null);
  const container = useRef(null);
  let canvasCtx;
  let camera;

  let url =
    "https://siigjmw19n.apigw.ntruss.com/face_health_estimate/v1/calculate_face_ppg_stress_cors";
  let uri = "/face_health_estimate/v1/calculate_face_ppg_stress_cors";

  let rgbArray = [];
  let sum_red = 0;
  let sum_green = 0;
  let sum_blue = 0;
  var mean_red = [];
  var mean_green = [];
  var mean_blue = [];
  // var maxHistLen = set_time ? Number(set_time) * 30 : 900;
  var maxHistLen = 900;
  var timingHist = [];
  let count = 0;
  let frame = 0;

  let boxLeft;
  let boxTop;
  let boxWidth;
  let boxHeight;

  let timestamp = 0;

  var lastPosition;
  var lastYPosition;
  let positionErr = 0;
  let yPositionErr = 0;

  const canvasElement = document.createElement("canvas");

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });
    faceMesh.setOptions({
      selfieMode: true,
      maxNumFaces: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    faceMesh.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
        },
      });
      camera.start();
      setLoding(false);
    }
  }, []);

  function onResults(results) {
    canvasCtx = canvasReference.current.getContext("2d");
    canvasCtx.width = webcamRef.current.video.videoWidth;
    canvasCtx.height = webcamRef.current.video.videoHeight;
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    let face_oval = [];
    let left_eye = [];
    let right_eye = [];
    let lips = [];
    let multiface = results.multiFaceLandmarks[0];

    if (results.multiFaceLandmarks[0]) {
      setPepare(false);
      setMeasuring(true);
      lastPosition = boxLeft;
      lastYPosition = boxTop;

      boxLeft = multiface[234].x * canvasElement.width;
      boxTop = multiface[10].y * canvasElement.height;
      boxWidth = multiface[454].x * canvasElement.width - boxLeft;
      boxHeight = multiface[152].y * canvasElement.height - boxTop;

      if (Math.abs(boxLeft - lastPosition) > 4) {
        positionErr++;
      }

      if (Math.abs(boxTop - lastYPosition) > 3) {
        yPositionErr++;
      }

      // face line, eye, mouse defined
      for (let i = 0; i < FACEMESH_FACE_OVAL.length; i++) {
        face_oval.push(FACEMESH_FACE_OVAL[i][0], FACEMESH_FACE_OVAL[i][1]);
      }
      for (let i = 0; i < FACEMESH_RIGHT_EYE.length; i++) {
        right_eye.push(FACEMESH_RIGHT_EYE[i][0], FACEMESH_RIGHT_EYE[i][1]);
      }
      for (let i = 0; i < FACEMESH_LEFT_EYE.length; i++) {
        left_eye.push(FACEMESH_LEFT_EYE[i][0], FACEMESH_LEFT_EYE[i][1]);
      }
      for (let i = 0; i < FACEMESH_LIPS.length; i++) {
        lips.push(FACEMESH_LIPS[i][0], FACEMESH_LIPS[i][1]);
      }
      canvasCtx.globalCompositeOperation = "destination-in";
      canvasCtx.beginPath();
      canvasCtx.moveTo(
        multiface[face_oval[0]].x * canvasElement.width,
        multiface[face_oval[0]].y * canvasElement.height
      );
      for (let i = 0; i < face_oval.length; i++) {
        canvasCtx.lineTo(
          multiface[face_oval[i]].x * canvasElement.width,
          multiface[face_oval[i]].y * canvasElement.height
        );
      }
      canvasCtx.fillStyle = "white";
      canvasCtx.fill();
      canvasCtx.globalCompositeOperation = "source-over";
      canvasCtx.beginPath();
      canvasCtx.moveTo(
        multiface[left_eye[0]].x * canvasElement.width,
        multiface[left_eye[0]].y * canvasElement.height
      );
      for (let i = 0; i < left_eye.length; i++) {
        canvasCtx.lineTo(
          multiface[left_eye[i]].x * canvasElement.width,
          multiface[left_eye[i]].y * canvasElement.height
        );
      }
      canvasCtx.fill();
      canvasCtx.beginPath();
      canvasCtx.moveTo(
        multiface[right_eye[0]].x * canvasElement.width,
        multiface[right_eye[0]].y * canvasElement.height
      );
      for (let i = 0; i < right_eye.length; i++) {
        canvasCtx.lineTo(
          multiface[right_eye[i]].x * canvasElement.width,
          multiface[right_eye[i]].y * canvasElement.height
        );
      }
      canvasCtx.fill();
      canvasCtx.beginPath();
      canvasCtx.moveTo(
        multiface[lips[0]].x * canvasElement.width,
        multiface[lips[0]].y * canvasElement.height
      );
      for (let i = 0; i < lips.length; i++) {
        canvasCtx.lineTo(
          multiface[lips[i]].x * canvasElement.width,
          multiface[lips[i]].y * canvasElement.height
        );
      }
      canvasCtx.fill();

      // rgb
      canvasCtx.strokeStyle = "cyan";
      canvasCtx.lineWidth = 2;
      canvasCtx.beginPath();
      canvasCtx.rect(boxLeft, boxTop, boxWidth, boxHeight);
      canvasCtx.stroke();

      let faceRegion = canvasCtx.getImageData(
        boxLeft,
        boxTop,
        boxWidth,
        boxHeight
      );
      const data = faceRegion.data;
      for (var i = 0; i < data.length; i += 4) {
        if (
          data[i + 1] + data[i + 2] + data[i + 3] !== 765 ||
          data[i + 1] + data[i + 2] + data[i + 3] !== 0
        )
          rgbArray.push([data[i + 1], data[i + 2], data[i + 3]]);
      }

      for (var j = 0; j < rgbArray.length; j++) {
        sum_red = sum_red + rgbArray[j][0];
        sum_green = sum_green + rgbArray[j][1];
        sum_blue = sum_blue + rgbArray[j][2];
      }

      timingHist.push(String(Date.now() * 1000));

      mean_red.push(sum_red / rgbArray.length);
      mean_green.push(sum_green / rgbArray.length);
      mean_blue.push(sum_blue / rgbArray.length);

      rgbArray = [];
      sum_red = 0;
      sum_green = 0;
      sum_blue = 0;

      container.current.value = mean_red.length;
      container.current.text = mean_red.length;

      if (mean_red.length > maxHistLen) {
        mean_red.shift();
        mean_green.shift();
        mean_blue.shift();
        timingHist.shift();
        let textArr = [];

        for (let i = 0; i < maxHistLen; i++) {
          textArr.push(
            `${timingHist[i]}	${mean_red[i]}	${mean_green[i]}	${mean_blue[i]}`
          );
        }

        textArr = textArr.join("\n");
        camera.stop();

        var blob = new Blob([textArr], { type: "text/plain" });

        var form = new FormData();
        form.append("rgb", blob);
        form.append("age", ageRecoil);
        form.append("gender", genderRecoil);
        setConfidenceLevel(positionErr + yPositionErr);

        let signature = makeSignature();

        const options = {
          method: "POST",
          headers: {
            "x-ncp-apigw-timestamp": timestamp,
            "x-ncp-iam-access-key": "PbDvaXxkTaHf19QGViU1",
            "x-ncp-apigw-signature-v2": signature,
            "x-ncp-apigw-api-key": "vkqvcuTCcBtjnErVIgyDtWzdBZPhYJo1VRtUqnx4",
          },
        };

        options.body = form;

        fetch(url, options)
          .then((response) => response.json())
          .then((response) => {
            if (response.result === 200) {
              setDataRecoil({
                hr: response.message.hr,
                msi: response.message.mentalStress,
                psi: response.message.physicalStress,
              });
              navigator("/result");
            }
          })
          .catch((err) => {
            setNoNetwork(true);
            console.error(err);
          });
        frame = frame + 1;
      }
    } else {
      if (mean_red.length < maxHistLen) {
        setNoFace(true);
        camera.stop();
      }
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    }
    canvasCtx.restore();
  }

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

  return (
    <MeasureContentWrapper>
      <VideoWrapper>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <canvas
          ref={canvasReference}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
          }}
        />
      </VideoWrapper>
      {/* <FaceCircle maxHistLen={maxHistLen} timingHist={timingHist} /> */}
      <FaceCircleWrapper>
        <CircularProgressbar
          // maxValue={900}
          strokeWidth={3}
          styles={buildStyles({
            // Text size
            textSize: "16px",
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            // Colors
            pathColor: `#006FAD`,
            trailColor: "#ffffff",
            backgroundColor: "#3e98c7",
          })}
          ref={container}
        />
      </FaceCircleWrapper>
    </MeasureContentWrapper>
  );
};

export default MeasureContent;
