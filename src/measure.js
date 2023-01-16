import "./measure.css";
import "./util/css/reset.css";
import "./util/js/format.js";
import "./util/js/grid.js";
import "./util/js/intersect.js";
import "./util/js/math.js";
import "./util/js/opencv.js";
import ProgressBar from "./util/js/progressbar.js";
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
import { Camera } from "@mediapipe/camera_utils";
import {
  FaceMesh,
  FACEMESH_RIGHT_EYE,
  FACEMESH_LEFT_EYE,
  FACEMESH_FACE_OVAL,
  FACEMESH_LIPS,
} from "@mediapipe/face_mesh";
import CryptoJS from "crypto-js";
import lottie from "lottie-web";
import animationData from "./util/animation/ani_heartrate.json";
import loadingData from "./util/animation/loading.json";
import { math } from "./util/js/math.js";
import CircleProgress from "js-circle-progress";
import DeviceDetector from "device-detector-js";

var cv = require("opencv.js");
var Fili = require("fili");

const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasElement2 = document.getElementsByClassName("output_canvas2")[0];
const canvasId = document.getElementById("canvas");
const respBpm = document.getElementsByClassName("bpm")[0];

const container = document.getElementsByClassName("progress-bar")[0];

const preparation = document.getElementsByClassName("Preparation")[0];
const measuring = document.getElementsByClassName("Measuring")[0];

const Modal = document.getElementsByClassName("modal")[0];
const detectedModal = document.getElementsByClassName("detected")[0];
const networkModal = document.getElementsByClassName("network")[0];
const detectedBtn = document.getElementsByClassName("detected-btn")[0];
const networkBtn = document.getElementsByClassName("network-btn")[0];

// const lottie = document.getElementsByClassName("lottie-player")[0];
// lottie.src = "./util/animation/ani_heartrate.json";

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
preparation.classList.remove("off");
measuring.classList.remove("on");
Modal.classList.remove("alert");
detectedModal.classList.remove("on");
networkModal.classList.remove("on");

setTimeout(() => {
  Loading.classList.add("Loaded");
  LoadingWrapper.classList.add("remove");
}, 2000);

const ctx = canvasElement.getContext("2d");
const ctx2 = canvasElement2.getContext("2d");

// canvasElement2.width = videoElement.width;
// canvasElement2.height = videoElement.height;

var last = performance.now();
let url =
  "https://siigjmw19n.apigw.ntruss.com/face_health_estimate/v1/calculate_face_ppg_stress_cors";
let uri = "/face_health_estimate/v1/calculate_face_ppg_stress_cors";

const MAX_CORNERS = 30;
const QUALITY_LEVEL = 0.01;
const MIN_DISTANCE = 1;
const useHarrisDetector = true;
const block_size = 3;

let rgbArray = [];
let sum_red = 0;
let sum_green = 0;
let sum_blue = 0;
var mean_red = [];
var mean_green = [];
var mean_blue = [];
// second * 30
var maxHistLen = 900;
var timingHist = [];
let frame = 0;
let H = [];
let curPollFreq = 30;
let graphData = [];

let width;
let height;
var VIEW_WIDTH;
var VIEW_HEIGHT;

let init_frame;
let lastFrameGray;
let frameGray;
let overlayMask;
let cap;
let signal = [];
let resp_sig = [];
let chart_sig1 = [];
let chart_sig2 = [];

let bpm = 0;
let rpm = 0;
let lastBPM = 0;
let resp = 0;
let nrom_q = 0;
let rect;

let p0;
let p1;
let frame0;
let frame1;
let st;
let err;
let resp_y = 0;
let p1_y;

let winSize;
let maxLevel;
let criteria;

let boxLeft;
let boxTop;
let boxWidth;
let boxHeight;

let respLeft;
let respTop;
let respWidth;
let respHeight;

let timestamp = 0;

// videoElement.width = 640;
// videoElement.height = 480;

canvasElement.width = videoElement.width;
canvasElement.height = videoElement.height;
canvasElement2.width = videoElement.width;
canvasElement2.height = videoElement.height;

lastFrameGray = new cv.Mat(
  canvasElement2.height,
  canvasElement2.width,
  cv.CV_8UC1
);
frameGray = new cv.Mat(canvasElement2.height, canvasElement2.width, cv.CV_8UC1);
overlayMask = new cv.Mat(
  canvasElement2.height,
  canvasElement2.width,
  cv.CV_8UC1
);
frame0 = new cv.Mat(canvasElement2.height, canvasElement2.width, cv.CV_8UC4);
frame1 = new cv.Mat(canvasElement2.height, canvasElement2.width, cv.CV_8UC4);

VIEW_WIDTH = canvasElement2.width;
VIEW_HEIGHT = canvasElement2.height;

p0 = new cv.Mat();

winSize = new cv.Size(75, 75);
maxLevel = 3;
criteria = new cv.TermCriteria(
  cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT,
  30,
  0.01
);

for (var i = 0; i < 150; i++) {
  chart_sig1[i] = 0;
  chart_sig2[i] = 0;
}

let cp = new CircleProgress(container, {
  value: 0,
  max: maxHistLen,
});

cp;

const mpFaceMesh = window;

const config = {
  locateFile: (file) => {
    return (
      `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@` +
      `${mpFaceMesh.VERSION}/${file}`
    );
  },
};

function onResults(results) {
  // lottieAnim.play();
  preparation.classList.add("off");
  measuring.classList.add("on");
  lottie.src = "";
  ctx.save();
  ctx2.save();
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  ctx2.clearRect(0, 0, canvasElement2.width, canvasElement2.height);
  ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  ctx2.drawImage(
    results.image,
    0,
    0,
    canvasElement2.width,
    canvasElement2.height
  );

  let face_oval = [];
  let left_eye = [];
  let right_eye = [];
  let lips = [];
  let multiface = results.multiFaceLandmarks[0];

  if (results.multiFaceLandmarks[0]) {
    boxLeft = multiface[234].x * VIEW_WIDTH;
    boxTop = multiface[10].y * VIEW_HEIGHT;
    boxWidth = multiface[454].x * VIEW_WIDTH - boxLeft;
    boxHeight = multiface[152].y * VIEW_HEIGHT - boxTop;

    respLeft = multiface[234].x * VIEW_WIDTH;
    respTop = multiface[152].y * VIEW_HEIGHT + 20;
    respHeight = 50;

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
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.moveTo(
      multiface[face_oval[0]].x * VIEW_WIDTH,
      multiface[face_oval[0]].y * VIEW_HEIGHT
    );
    for (let i = 0; i < face_oval.length; i++) {
      ctx.lineTo(
        multiface[face_oval[i]].x * VIEW_WIDTH,
        multiface[face_oval[i]].y * VIEW_HEIGHT
      );
    }
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.moveTo(
      multiface[left_eye[0]].x * VIEW_WIDTH,
      multiface[left_eye[0]].y * VIEW_HEIGHT
    );
    for (let i = 0; i < left_eye.length; i++) {
      ctx.lineTo(
        multiface[left_eye[i]].x * VIEW_WIDTH,
        multiface[left_eye[i]].y * VIEW_HEIGHT
      );
    }
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(
      multiface[right_eye[0]].x * VIEW_WIDTH,
      multiface[right_eye[0]].y * VIEW_HEIGHT
    );
    for (let i = 0; i < right_eye.length; i++) {
      ctx.lineTo(
        multiface[right_eye[i]].x * VIEW_WIDTH,
        multiface[right_eye[i]].y * VIEW_HEIGHT
      );
    }
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(
      multiface[lips[0]].x * VIEW_WIDTH,
      multiface[lips[0]].y * VIEW_HEIGHT
    );
    for (let i = 0; i < lips.length; i++) {
      ctx.lineTo(
        multiface[lips[i]].x * VIEW_WIDTH,
        multiface[lips[i]].y * VIEW_HEIGHT
      );
    }
    ctx.fill();

    // rgb
    ctx.strokeStyle = "transparent";
    ctx2.strokeStyle = "cyan";
    ctx.lineWidth = 2;
    ctx2.lineWidth = 2;
    ctx.beginPath();
    ctx2.beginPath();
    ctx.rect(boxLeft, boxTop, boxWidth, boxHeight);
    ctx2.rect(boxLeft, boxTop, boxWidth, boxHeight);
    ctx.stroke();
    ctx2.stroke();

    let faceRegion = ctx.getImageData(boxLeft, boxTop, boxWidth, boxHeight);
    const data = faceRegion.data;
    for (var i = 0; i < data.length; i += 4) {
      if (
        data[i + 1] + data[i + 2] + data[i + 3] != 765 ||
        data[i + 1] + data[i + 2] + data[i + 3] != 0
      )
        rgbArray.push([data[i + 1], data[i + 2], data[i + 3]]);
    }

    for (var i = 0; i < rgbArray.length; i++) {
      sum_red = sum_red + rgbArray[i][0];
      sum_green = sum_green + rgbArray[i][1];
      sum_blue = sum_blue + rgbArray[i][2];
    }

    timingHist.push(String(Date.now() * 1000));
    last = performance.now();

    mean_red.push(sum_red / rgbArray.length);
    mean_green.push(sum_green / rgbArray.length);
    mean_blue.push(sum_blue / rgbArray.length);

    rgbArray = [];
    sum_red = 0;
    sum_green = 0;
    sum_blue = 0;

    cp.value = timingHist.length;

    // resp
    try {
      if (!frameGray.empty()) {
        frameGray.copyTo(lastFrameGray); // Save last frame
      }

      let imgData = ctx2.getImageData(
        0,
        0,
        canvasElement2.width,
        canvasElement2.height
      );

      let src = cv.matFromImageData(imgData);
      cv.cvtColor(src, frameGray, cv.COLOR_RGBA2GRAY);

      if (mean_red.length < 2) {
        fix_resp(frameGray);
      } else {
        resp_y = resp_call(frameGray, lastFrameGray);
      }

      // Update the signal
      resp_sig.push(resp_y);
    } catch (e) {
      // Modal.classList.add("alert");
      // detectedModal.classList.add("on");
      console.log("Error capturing frame:");
      console.log(e);
    }
    // resp-end
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
      saveToFile_Chrome("this", textArr);
      camera.stop();
      stop();

      var blob = new Blob([textArr], { type: "text/plain" });

      var form = new FormData();
      form.append("rgb", blob);
      form.append("age", sessionStorage.getItem("age"));
      form.append("gender", sessionStorage.getItem("gender"));

      let signature = makeSignature();

      Loading.classList.remove("Loaded");
      LoadingWrapper.classList.remove("remove");
      Ani.classList.add("off");

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

      let resp_signals = cv.matFromArray(
        resp_sig.length,
        1,
        cv.CV_32FC1,
        resp_sig
      );

      var fps = Math.round(curPollFreq);
      movingAverage(resp_signals, 3, Math.max(Math.floor(fps / 6), 2));

      let res = peakdet(resp_sig, 0.5);

      let timeInterval =
        (timingHist[resp_sig.length - 1] - timingHist[0]) / 1000000;
      let second = Math.trunc(timeInterval);
      let count = 60 / second;

      resp = res.peaks.length * count;

      fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          if (response.result === 200) {
            respBpm.textContent = `${response.message.hr} bpm`;
            sessionStorage.setItem("msi", response.message.mentalStress);
            sessionStorage.setItem("psi", response.message.physicalStress);
            sessionStorage.setItem("hr", response.message.hr);
            sessionStorage.setItem("resp", Math.trunc(resp));
            location.href = "./result.html";
          }
        })
        .catch((err) => {
          Modal.classList.add("alert");
          networkModal.classList.add("on");
          console.error(err);
        });
      frame = frame + 1;
    }
  } else {
    // Modal.classList.add("alert");
    // detectedModal.classList.add("on");
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx2.clearRect(0, 0, canvasElement2.width, canvasElement2.height);
  }
  ctx.restore();
  ctx2.restore();
}

// const faceMesh = new FaceMesh({
//   locateFile: (file) => {
//     return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
//   },
// });

// faceMesh.setOptions({
//   maxNumFaces: 1,
//   refineLandmarks: true,
//   minDetectionConfidence: 0.5,
//   minTrackingConfidence: 0.5,
// });

// faceMesh.onResults(onResults);

const solutionOptions = {
  enableFaceGeometry: false,
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
};

const faceMesh = new mpFaceMesh.FaceMesh(config);
faceMesh.setOptions(solutionOptions);
faceMesh.onResults(onResults);

// Camera Handler
navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    facingMode: "user",
    width: 640,
    height: 480,
  },
});

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceMesh.send({ image: videoElement });
  },
  width: 640,
  height: 480,
});

camera.start();

// Button Handler
detectedBtn.addEventListener("click", function () {
  location.href = "./measure.html";
});
networkBtn.addEventListener("click", function () {
  location.href = "./measure.html";
});

function saveToFile_Chrome(fileName, content) {
  var blob = new Blob([content], { type: "text/plain" });
  let objURL = window.URL.createObjectURL(blob);

  // 이전에 생성된 메모리 해제
  if (window.__Xr_objURL_forCreatingFile__) {
    window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
  }
  window.__Xr_objURL_forCreatingFile__ = objURL;
  var a = document.createElement("a");
  a.download = fileName;
  a.href = objURL;
  a.click();
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

function fix_resp(lastFrameGray) {
  if (respTop + 20 < lastFrameGray.rows) {
    rect = new cv.Rect(
      Math.round(respLeft),
      Math.round(respTop),
      Math.round(boxWidth),
      20
    );
  } else {
    rect = new cv.Rect(
      Math.round(respLeft),
      Math.round(respTop),
      Math.round(boxWidth),
      respTop + 20 - lastFrameGray.rows
    );
  }

  frame0 = new cv.Mat();
  frame0 = lastFrameGray.roi(rect);

  cv.imshow(canvasId, frame0);

  let none = new cv.Mat();

  p0 = new cv.Mat();

  cv.goodFeaturesToTrack(
    frame0,
    p0,
    MAX_CORNERS,
    QUALITY_LEVEL,
    MIN_DISTANCE,
    none,
    block_size,
    useHarrisDetector,
    0.05
  );
}

function resp_call(frameGray, lastFrameGray) {
  if (respTop + 20 < lastFrameGray.rows) {
    rect = new cv.Rect(
      Math.round(respLeft),
      Math.round(respTop),
      Math.round(boxWidth),
      20
    );
  } else {
    rect = new cv.Rect(
      Math.round(respLeft),
      Math.round(respTop),
      Math.round(boxWidth),
      respTop + 20 - lastFrameGray.rows
    );
  }

  frame0 = new cv.Mat();
  frame0 = lastFrameGray.roi(rect);
  frame1 = new cv.Mat();
  frame1 = frameGray.roi(rect);
  cv.imshow("canvas", frame1);

  p1 = new cv.Mat();
  st = new cv.Mat();
  err = new cv.Mat();

  cv.calcOpticalFlowPyrLK(
    frame0,
    frame1,
    p0,
    p1,
    st,
    err,
    winSize,
    maxLevel,
    criteria
  );

  // select good points
  let goodNew = [];
  let goodOld = [];
  for (let i = 0; i < st.rows; i++) {
    if (st.data[i] === 1) {
      goodNew.push(new cv.Point(p1.data32F[i * 2], p1.data32F[i * 2 + 1]));
      goodOld.push(new cv.Point(p0.data32F[i * 2], p0.data32F[i * 2 + 1]));
    }
  }
  let result = 0;
  for (let i = 0; i < goodNew.length; i++) {
    result += goodNew[i].y;
  }
  p1_y = result / goodNew.length;

  p0.delete();
  p0 = null;
  p0 = new cv.Mat(goodNew.length, 1, cv.CV_32FC2);
  for (let i = 0; i < goodNew.length; i++) {
    p0.data32F[i * 2] = goodNew[i].x;
    p0.data32F[i * 2 + 1] = goodNew[i].y;
  }

  return p1_y;
}

function peakdet(data, delta) {
  var peaks = [];
  var valleys = [];

  var min = Infinity;
  var max = -Infinity;
  var minPosition = Number.NaN;
  var maxPosition = Number.NaN;

  var lookForMax = true;

  var current;
  for (var i = 0; i < data.length; i++) {
    current = parseFloat(data[i]);
    if (isNaN(current) || !isFinite(current)) {
      // alert("Item that's not a number!");
      break;
    }
    if (current > max) {
      max = current;
      maxPosition = i;
    }
    if (current < min) {
      min = current;
      minPosition = i;
    }
    if (lookForMax) {
      if (current < max - delta) {
        peaks.push({ position: maxPosition, value: max });
        min = current;
        minPosition = i;
        lookForMax = false;
      }
    } else {
      if (current > min + delta) {
        valleys.push({ position: minPosition, value: min });
        max = current;
        maxPosition = i;
        lookForMax = true;
      }
    }
  }
  return { peaks: peaks, valleys: valleys };
}

function movingAverage(signal, n, kernelSize) {
  for (var i = 0; i < n; i++) {
    cv.blur(signal, signal, { height: kernelSize, width: 1 });
  }
}
