// import libraries
import "./measure.css";
import "./util/css/reset.css";
import "./util/js/format.js";
import "./util/js/grid.js";
import "./util/js/intersect.js";
import "./util/js/math.js";
import "./util/js/opencv.js";
import "./util/js/bci.min.js";
import "./util/js/fili.min.js";
import "./util/js/numjs.min.js";
import "./util/js/dygraph.min.js";
import "./util/js/lottie-player.js";
import "./util/js/rollups/hmac-md5.js";
import "./util/js/rollups/aes.js";
import "./util/js/rollups/hmac-ripemd160.js";
import "./util/js/rollups/hmac-sha1.js";
import "./util/js/rollups/hmac-sha224.js";
import "./util/js/rollups/hmac-sha256.js";
import "./util/js/rollups/hmac-sha3.js";
import "./util/js/rollups/hmac-sha384.js";
import "./util/js/rollups/hmac-sha512.js";
import "./util/js/rollups/md5.js";
import "./util/js/rollups/pbkdf2.js";
import "./util/js/rollups/rabbit.js";
import "./util/js/rollups/rabbit-legacy.js";
import "./util/js/rollups/rc4.js";
import "./util/js/rollups/ripemd160.js";
import "./util/js/rollups/sha1.js";
import "./util/js/rollups/sha224.js";
import "./util/js/rollups/sha256.js";
import "./util/js/rollups/sha3.js";
import "./util/js/rollups/sha384.js";
import "./util/js/rollups/sha512.js";
import "./util/js/rollups/tripledes.js";
import {
  FACEMESH_RIGHT_EYE,
  FACEMESH_LEFT_EYE,
  FACEMESH_FACE_OVAL,
  FACEMESH_LIPS,
} from "@mediapipe/face_mesh";
import CryptoJS from "crypto-js";
import lottie from "lottie-web";
import animationData from "./util/animation/ani_heartrate.json";
import loadingData from "./util/animation/loading.json";
import CircleProgress from "js-circle-progress";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-wasm";

const facemesh = require("@tensorflow-models/facemesh");

var cv = require("opencv.js");

require("@tensorflow/tfjs-backend-wasm");
tf.setBackend("wasm").then(() => main());

// html tag
const video = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
// const canvasElement2 = document.getElementsByClassName("output_canvas2")[0];
// const canvasId = document.getElementById("canvas");
// const respBpm = document.getElementsByClassName("bpm")[0];

const container = document.getElementsByClassName("progress-bar")[0];

const preparation = document.getElementsByClassName("Preparation")[0];
const measuring = document.getElementsByClassName("Measuring")[0];

const Modal = document.getElementsByClassName("modal")[0];
const detectedModal = document.getElementsByClassName("detected")[0];
const networkModal = document.getElementsByClassName("network")[0];
const detectedBtn = document.getElementsByClassName("detected-btn")[0];
const networkBtn = document.getElementsByClassName("network-btn")[0];

let facepred;

// const lottie = document.getElementsByClassName("lottie-player")[0];
// lottie.src = "./util/animation/ani_heartrate.json";

// Animation
const AniWrapper = document.getElementsByClassName("lottie-container")[0];
const LoadingWrapper = document.getElementsByClassName("loading-wrapper")[0];

const Ani = document.createElement("div");
Ani.style.width = "14.3928035982009vh";
Ani.style.height = "8.095952023988007vh";
Ani.style.minWidth = "96px";
Ani.style.minHeight = "54px";
Ani.classList.add("container");

const Loading = document.createElement("div");
Loading.style.width = "8.995502248875562vh";
Loading.style.height = "8.995502248875562vh";
Loading.style.minWidth = "60px";
Loading.style.minHeight = "60px";
Loading.classList.add("loading");

lottie.loadAnimation({
  container: Ani,
  renderer: "svg",
  loop: true,
  autoplay: true,
  animationData: animationData,
});

lottie.loadAnimation({
  container: Loading,
  renderer: "svg",
  loop: true,
  autoplay: true,
  animationData: loadingData,
});

AniWrapper.appendChild(Ani);
LoadingWrapper.appendChild(Loading);

detectedBtn.addEventListener("click", () => {
  location.href = "./measure.html";
});

networkBtn.addEventListener("click", () => {
  location.href = "./measure.html";
});

Loading.classList.remove("Loaded");
LoadingWrapper.classList.remove("remove");
preparation.classList.add("off");
measuring.classList.remove("on");
Modal.classList.remove("alert");
detectedModal.classList.remove("on");
networkModal.classList.remove("on");

const ctx = canvasElement.getContext("2d");
// const ctx2 = canvasElement2.getContext("2d");

let url =
  "https://siigjmw19n.apigw.ntruss.com/face_health_estimate/v1/calculate_face_ppg_stress_cors";
let uri = "/face_health_estimate/v1/calculate_face_ppg_stress_cors";

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

let cp = new CircleProgress(container, {
  value: 0,
  max: maxHistLen,
});

cp;

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

let curFaces;
let fmesh;

// main function
async function main() {
  fmesh = await facemesh.load({ maxFaces: 1 });
  // Set up front-facing camera
  await setupCamera();

  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;

  video.play();

  // Create canvas and drawing context
  canvasElement.width = videoWidth / 2;
  canvasElement.height = videoHeight / 2;

  // start prediction loop
  renderPrediction();
}

// Calls face mesh on the video and outputs the eyes and face bounding boxes to global vars
async function renderPrediction() {
  preparation.classList.remove("off");
  Loading.classList.add("Loaded");
  LoadingWrapper.classList.add("remove");
  facepred = await fmesh.estimateFaces(canvasElement);
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
  lottie.src = "";

  ctx.strokeStyle = "cyan";
  ctx.lineWidth = 2;

  // curFaces = facepred;
  let face_oval = [];
  let left_eye = [];
  let right_eye = [];
  let lips = [];

  for (let face of curFaces) {
    if (face.faceInViewConfidence > 0.5) {
      preparation.classList.add("off");
      measuring.classList.add("on");

      let mesh = face.scaledMesh;
      lastPosition = boxLeft;
      lastYPosition = boxTop;

      // Get the facial region of interest's bounds
      boxLeft = mesh[234][0];
      boxTop = mesh[10][1];
      boxWidth = mesh[454][0] - boxLeft;
      boxHeight = mesh[152][1] - boxTop;

      if (Math.abs(boxLeft - lastPosition) > 10) {
        positionErr++;
      }

      if (Math.abs(boxTop - lastYPosition) > 10) {
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
      let faceSrc = cv.matFromImageData(faceRegion);
      let faceScaled = new cv.Mat();
      cv.resize(
        faceSrc,
        faceScaled,
        new cv.Size(32, 32),
        0,
        0,
        cv.INTER_NEAREST
      );
      let rgbData = cv.mean(faceScaled);

      // Get FPS of this loop as well
      timingHist.push(String(Date.now() * 1000));

      mean_red.push(rgbData[0]);
      mean_green.push(rgbData[1]);
      mean_blue.push(rgbData[2]);

      cp.value = mean_red.length;

      if (mean_red.length > maxHistLen) {
        mean_red.shift();
        mean_green.shift();
        mean_blue.shift();
        timingHist.shift();
        let textArr = [];

        Loading.classList.remove("Loaded");
        LoadingWrapper.classList.remove("remove");
        Ani.classList.add("off");

        for (let i = 0; i < maxHistLen; i++) {
          textArr.push(
            `${timingHist[i]}	${mean_red[i]}	${mean_green[i]}	${mean_blue[i]}`
          );
        }

        textArr = textArr.join("\n");
        stop();

        var blob = new Blob([textArr], { type: "text/plain" });
        Loading.classList.remove("Loaded");
        LoadingWrapper.classList.remove("remove");
        Ani.classList.add("off");

        var form = new FormData();
        form.append("rgb", blob);
        form.append("age", sessionStorage.getItem("age"));
        form.append("gender", sessionStorage.getItem("gender"));

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
        Loading.classList.remove("Loaded");
        LoadingWrapper.classList.remove("remove");
        Ani.classList.add("off");

        sessionStorage.setItem("face", positionErr + yPositionErr);

        fetch(url, options)
          .then((response) => response.json())
          .then((response) => {
            if (response.result === 200) {
              sessionStorage.setItem("msi", response.message.mentalStress);
              sessionStorage.setItem("psi", response.message.physicalStress);
              sessionStorage.setItem("hr", response.message.hr);
              location.href = "./result.html";
            } else {
              Modal.classList.add("alert");
              networkModal.classList.add("on");
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
          Modal.classList.add("alert");
          detectedModal.classList.add("on");
        }
      }
    }
  }
}

// Button Handler
detectedBtn.addEventListener("click", function () {
  location.href = "./measure.html";
});
networkBtn.addEventListener("click", function () {
  location.href = "./measure.html";
});

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
