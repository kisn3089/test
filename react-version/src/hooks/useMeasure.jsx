import { useRef, useState } from "react";
import {
  FACEMESH_RIGHT_EYE,
  FACEMESH_LEFT_EYE,
  FACEMESH_FACE_OVAL,
  FACEMESH_LIPS,
} from "@mediapipe/face_mesh";
import CryptoJS from "crypto-js";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-wasm";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { confidenceLevelState } from "../store/confidenceLevel";

const facemesh = require("@tensorflow-models/facemesh");
require("@tensorflow/tfjs-backend-wasm");

const useMeasure = () => {
  tf.setBackend("wasm").then(() => main());

  const [loading, setLoding] = useState(true);
  const [prepare, setPepare] = useState(true);
  const [measuring, setMeasuring] = useState(false);
  const [noFace, setNoFace] = useState(false);
  const [noNetwork, setNoNetwork] = useState(false);
  const [confidenceLevel, setConfidenceLevel] =
    useRecoilState(confidenceLevelState);

  const navigate = useNavigate();

  let video = useRef();
  let canvasElement = useRef();
  const ctx = canvasElement.getContext("2d");

  let url =
    "https://siigjmw19n.apigw.ntruss.com/face_health_estimate/v1/calculate_face_ppg_stress_cors";
  let uri = "/face_health_estimate/v1/calculate_face_ppg_stress_cors";

  let rgbArray = [];
  let sum_red = 0;
  let sum_green = 0;
  let sum_blue = 0;
  let mean_red = [];
  let mean_green = [];
  let mean_blue = [];
  // second * 60
  const maxHistLen = 900;
  let timingHist = [];
  let frame = 0;

  var boxLeft;
  var boxTop;
  var boxWidth;
  var boxHeight;

  let timestamp = 0;

  var lastPosition;
  var lastYPosition;
  let positionErr = 0;
  let yPositionErr = 0;
  var curFaces;
  var fmesh;

  // camera handler
  async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        aspectRatio: 1.333,
        width: { ideal: 1280 },
      },
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve(video);
      };
    });
  }

  function stop() {
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  }

  // main function
  async function main() {
    fmesh = await facemesh.load({ maxFaces: 1 });
    // Set up front-facing camera
    await setupCamera();

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    video.play();
    if (timingHist.length < maxHistLen) {
      setLoding(false);
    } else {
      setLoding(true);
    }

    // Create canvas and drawing context
    canvasElement.width = videoWidth / 2;
    canvasElement.height = videoHeight / 2;

    // start prediction loop
    renderPrediction();
  }

  // Calls face mesh on the video and outputs the eyes and face bounding boxes to global vars
  async function renderPrediction() {
    let facepred = await fmesh.estimateFaces(canvasElement);
    ctx.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    if (facepred.length > 0) {
      // If we find a face, process it
      curFaces = facepred;
      await drawFaces();
    }

    requestAnimationFrame(renderPrediction);
  }

  // Draws the current eyes onto the canvas, directly from video streams
  async function drawFaces() {
    setPepare(false);
    setMeasuring(true);

    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 2;

    // curFaces = facepred;
    let face_oval = [];
    let left_eye = [];
    let right_eye = [];
    let lips = [];

    for (let face of curFaces) {
      if (face.faceInViewConfidence > 0.5) {
        let mesh = face.scaledMesh;
        lastPosition = boxLeft;
        lastYPosition = boxTop;

        // Get the facial region of interest's bounds
        boxLeft = mesh[234][0];
        boxTop = mesh[10][1];
        boxWidth = mesh[454][0] - boxLeft;
        boxHeight = mesh[152][1] - boxTop;

        if (Math.abs(boxLeft - lastPosition) > 15) {
          positionErr++;
        }

        if (Math.abs(boxTop - lastYPosition) > 15) {
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

        ctx.fillStyle = "white";
        ctx.globalCompositeOperation = "source-over";
        ctx.beginPath();
        ctx.moveTo(mesh[left_eye[0]][0], mesh[left_eye[0]][1]);
        for (let i = 0; i < left_eye.length; i++) {
          ctx.lineTo(mesh[left_eye[i]][0], mesh[left_eye[i]][1]);
        }
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(mesh[right_eye[0]][0], mesh[right_eye[0]][1]);
        for (let i = 0; i < right_eye.length; i++) {
          ctx.lineTo(mesh[right_eye[i]][0], mesh[right_eye[i]][1]);
        }
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(mesh[lips[0]][0], mesh[lips[0]][1]);
        for (let i = 0; i < lips.length; i++) {
          ctx.lineTo(mesh[lips[i]][0], mesh[lips[i]][1]);
        }
        ctx.fill();

        // Draw the box a bit larger for debugging purposes
        ctx.beginPath();
        ctx.rect(boxLeft, boxTop, boxWidth, boxHeight);
        // ctx.fill();
        ctx.stroke();

        // Get the image data from that region
        let faceRegion = ctx.getImageData(boxLeft, boxTop, boxWidth, boxHeight);
        const data = faceRegion.data;
        for (var i = 0; i < data.length; i += 4) {
          if (
            data[i + 1] + data[i + 2] + data[i + 3] !== 765 ||
            data[i + 1] + data[i + 2] + data[i + 3] !== 0
          ) {
            rgbArray.push([data[i + 1], data[i + 2], data[i + 3]]);
          }
        }

        // Get the area into Tensorflow, then split it and average the green channel
        for (var j = 0; j < rgbArray.length; j++) {
          sum_red = sum_red + rgbArray[j][0];
          sum_green = sum_green + rgbArray[j][1];
          sum_blue = sum_blue + rgbArray[j][2];
        }

        // Get FPS of this loop as well
        timingHist.push(String(Date.now() * 1000));

        mean_red.push(sum_red / (boxWidth * boxHeight));
        mean_green.push(sum_green / (boxWidth * boxHeight));
        mean_blue.push(sum_blue / (boxWidth * boxHeight));

        rgbArray = [];
        sum_red = 0;
        sum_green = 0;
        sum_blue = 0;

        if (mean_red.length > maxHistLen) {
          mean_red.shift();
          mean_green.shift();
          mean_blue.shift();
          timingHist.shift();
          let textArr = [];
          stop();

          for (let i = 0; i < maxHistLen; i++) {
            textArr.push(
              `${timingHist[i]}	${mean_red[i]}	${mean_green[i]}	${mean_blue[i]}`
            );
          }

          textArr = textArr.join("\n");

          var blob = new Blob([textArr], { type: "text/plain" });

          var form = new FormData();
          form.append("rgb", blob);
          form.append("age", sessionStorage.getItem("age"));
          form.append("gender", sessionStorage.getItem("gender"));
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
                sessionStorage.setItem("msi", response.message.mentalStress);
                sessionStorage.setItem("psi", response.message.physicalStress);
                sessionStorage.setItem("hr", response.message.hr);
                navigate("/result.html");
              } else {
                setNoNetwork(true);
              }
            })
            .catch((err) => {
              console.error(err);
            });
          frame = frame + 1;
        }
      } else {
        if (video.srcObject.active !== false) {
          if (mean_red.length > 30) {
            stop();
            setNoFace(true);
          }
        }
      }
    }
  }

  const handleClickPrev = () => {
    navigate(-1);
  };

  const handleClickOK = () => {
    navigate("/measure");
  };

  const makeSignature = () => {
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
  };

  return {
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
  };
};

export default useMeasure;
