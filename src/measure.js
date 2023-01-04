import "./measure.css";

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

preparation.classList.remove("off");
measuring.classList.remove("on");
Modal.classList.remove("alert");
detectedModal.classList.remove("on");
networkModal.classList.remove("on");

const ctx = canvasElement.getContext("2d");
const ctx2 = canvasElement2.getContext("2d");

var last = performance.now();
let url =
  "https://siigjmw19n.apigw.ntruss.com/face_health_estimate/v1/calculate_face_ppg_stress_cors";
let uri = "/face_health_estimate/v1/calculate_face_ppg_stress_cors";

const DEFAULT_FPS = 30;
const LOW_BPM = 50;
const HIGH_BPM = 180;
const REL_MIN_FACE_SIZE = 0.4;
const SEC_PER_MIN = 60;
const MSEC_PER_SEC = 1000;
const MAX_CORNERS = 30;
const MIN_CORNERS = 5;
const QUALITY_LEVEL = 0.01;
const MIN_DISTANCE = 1;
const useHarrisDetector = true;
const block_size = 3;

var average = (array) => array.reduce((a, b) => a + b) / array.length;
var argMax = (array) =>
  array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
let rgbArray = [];
let sum_red = 0;
let sum_green = 0;
let sum_blue = 0;
var mean_red = [];
var mean_green = [];
var mean_blue = [];
let fpos = [];
// var maxHistLen = set_time ? Number(set_time) * 30 : 900;
var maxHistLen = 900;
var timingHist = [];
let frame = 0;
let H = [];
let curPollFreq = 30;
let graphData = [];

let targetFps = 30;
let windowSize = 5;
let rppgInterval = 150;
let window_frame = 1;

let width;
let height;
var VIEW_WIDTH;
var VIEW_HEIGHT;
let streaming = false;
let stream = null;
var faceDetector;

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
// Create a mask image for drawing purposes
let zeroEle;
let mask;
let color = [];
let sig_show = 0;
let date1;

let boxLeft;
let boxTop;
let boxWidth;
let boxHeight;

let respLeft;
let respTop;
let respWidth;
let respHeight;

const SAMPLE_FREQUENCY = 30;
const HPF_CUTOFF = 3;
const LPF_CUTOFF = 0.8;
const iirCalculator = new Fili.CalcCascades();
const bpfCoeffs = iirCalculator.bandpass({
  order: 2,
  characteristic: "butterworth",
  Fs: curPollFreq,
  Fc: LPF_CUTOFF,
  Fc2: HPF_CUTOFF,
  gain: 0,
  preGain: false,
});
let timestamp = 0;

const bpfCoeffs2 = iirCalculator.bandpass({
  order: 2,
  characteristic: "butterworth",
  Fs: 30,
  Fc: 0.1,
  Fc2: 0.5,
  gain: 0,
  preGain: false,
});

const bandpassFilter = new Fili.IirFilter(bpfCoeffs);
const bandpassFilter2 = new Fili.IirFilter(bpfCoeffs2);

cv["onRuntimeInitialized"] = () => {
  try {
    videoElement.width = 640;
    videoElement.height = 480;
    lastFrameGray = new cv.Mat(
      canvasElement2.height,
      canvasElement2.width,
      cv.CV_8UC1
    );
    frameGray = new cv.Mat(
      canvasElement2.height,
      canvasElement2.width,
      cv.CV_8UC1
    );
    overlayMask = new cv.Mat(
      canvasElement2.height,
      canvasElement2.width,
      cv.CV_8UC1
    );
    frame0 = new cv.Mat(
      canvasElement2.height,
      canvasElement2.width,
      cv.CV_8UC4
    );
    frame1 = new cv.Mat(
      canvasElement2.height,
      canvasElement2.width,
      cv.CV_8UC4
    );

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

    date1 = new Date();
  } catch (e) {
    console.log(e);
  }
};

function onResults(results) {
  preparation.classList.add("off");
  measuring.classList.add("on");
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
    boxLeft = multiface[234].x * 640;
    boxTop = multiface[10].y * 480;
    boxWidth = multiface[454].x * 640 - boxLeft;
    boxHeight = multiface[152].y * 480 - boxTop;

    respLeft = multiface[234].x * 640;
    respTop = multiface[152].y * 480 + 50;
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
      multiface[face_oval[0]].x * 640,
      multiface[face_oval[0]].y * 480
    );
    for (let i = 0; i < face_oval.length; i++) {
      ctx.lineTo(
        multiface[face_oval[i]].x * 640,
        multiface[face_oval[i]].y * 480
      );
    }
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.moveTo(multiface[left_eye[0]].x * 640, multiface[left_eye[0]].y * 480);
    for (let i = 0; i < left_eye.length; i++) {
      ctx.lineTo(
        multiface[left_eye[i]].x * 640,
        multiface[left_eye[i]].y * 480
      );
    }
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(
      multiface[right_eye[0]].x * 640,
      multiface[right_eye[0]].y * 480
    );
    for (let i = 0; i < right_eye.length; i++) {
      ctx.lineTo(
        multiface[right_eye[i]].x * 640,
        multiface[right_eye[i]].y * 480
      );
    }
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(multiface[lips[0]].x * 640, multiface[lips[0]].y * 480);
    for (let i = 0; i < lips.length; i++) {
      ctx.lineTo(multiface[lips[i]].x * 640, multiface[lips[i]].y * 480);
    }
    ctx.fill();

    // rgb
    ctx.strokeStyle = "tran";
    ctx2.strokeStyle = "transparent";
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
      Modal.classList.add("alert");
      detectedModal.classList.add("on");
      console.log("Error capturing frame:");
      console.log(e);
    }
    // resp-end
    if (mean_red.length > maxHistLen) {
      mean_red.shift();
      mean_green.shift();
      mean_blue.shift();
      timingHist.shift();
      // resp_sig.shift();
      let textArr = [];

      for (let i = 0; i < maxHistLen; i++) {
        textArr.push(
          `${timingHist[i]}	${mean_red[i]}	${mean_green[i]}	${mean_blue[i]}`
        );
      }

      textArr = textArr.join("\n");
      saveToFile_Chrome("this", textArr);
      camera.stop();

      var blob = new Blob([textArr], { type: "text/plain" });

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

      let resp_signals = cv.matFromArray(
        resp_sig.length,
        1,
        cv.CV_32FC1,
        resp_sig
      );

      var fps = Math.round(curPollFreq);
      movingAverage(resp_signals, 3, Math.max(Math.floor(fps / 6), 2));

      let res = peakdet(resp_sig, 0.5);
      resp = res.peaks.length * 2;

      fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          if (response.result === 200) {
            // fpos = bandpassFilter.simulate(response.message.hr_graph);
            respBpm.textContent = `${response.message.hr} bpm`;
            sessionStorage.setItem("msi", response.message.mentalStress);
            sessionStorage.setItem("psi", response.message.physicalStress);
            sessionStorage.setItem("hr", response.message.hr);
            sessionStorage.setItem("resp", resp);
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
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx2.clearRect(0, 0, canvasElement2.width, canvasElement2.height);
  }
  ctx.restore();
  ctx2.restore();
}

const faceMesh = new FaceMesh({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
  },
});

faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

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

// Progress Bar Handler
var bar = new ProgressBar.Circle(container, {
  strokeWidth: 3,
  easing: "easeInOut",
  duration: 30000,
  color: "rgba(0, 111, 173, 1)",
  trailColor: "#fff",
  trailWidth: 3,
  svgStyle: null,
});

bar.animate(1.0);

// Button Handler
detectedBtn.addEventListener("click", function () {
  location.href = "./measure.html";
});
networkBtn.addEventListener("click", function () {
  location.href = "./measure.html";
});

var heartrate = 0;
function updateChart(times, freq, data) {
  // Get the bin frequencies from their index
  data = data.map((elem) => Math.abs(elem));

  let index_07 = math.round(0.8 / (15 / 513));
  let index_4 = math.round(4 / (15 / 513));
  let max = Math.max(...data.slice(index_07, index_4));
  let maxloc = data.indexOf(max);
  let maxHz = freq[maxloc];

  document.getElementById("HR_indicator").innerHTML =
    "Predicted heartrate: " + Math.round(maxHz * 60) + " BPM";
}

function pos(red, green, blue) {
  let vred = nj.array([red]);
  let vgreen = nj.array([green]);
  let vblue = nj.array([blue]);
  let C = [red, green, blue];

  let mean_red = vred.mean();
  let mean_green = vgreen.mean();
  let mean_blue = vblue.mean();
  let mean_color = nj.array([mean_red, mean_green, mean_blue]);

  let a = [
    [1, 2],
    [3, 4],
  ];

  let diag_mean_color = nj.diag(mean_color);
  let b = [
    [
      diag_mean_color.selection.data[0],
      diag_mean_color.selection.data[1],
      diag_mean_color.selection.data[2],
    ],
    [
      diag_mean_color.selection.data[3],
      diag_mean_color.selection.data[4],
      diag_mean_color.selection.data[5],
    ],
    [
      diag_mean_color.selection.data[6],
      diag_mean_color.selection.data[7],
      diag_mean_color.selection.data[8],
    ],
  ];

  let diag_mean_color_inv = math.inv(b);
  let Cn = multiply(diag_mean_color_inv, C);

  for (var i = 0; i < C.length; i++) {
    Cn[0][i] = Cn[0][i] - 1;
    Cn[1][i] = Cn[1][i] - 1;
    Cn[2][i] = Cn[2][i] - 1;
  }

  let projection_matrix = [
    [0, 1, -1],
    [-2, 1, 1],
  ];
  let S = multiply(projection_matrix, Cn);
  let std = [1, math.std(S[0]) / math.std(S[1])];

  let P = math.multiply(std, S);
  for (var i = 0; i < P.length; i++) {
    H[i] = (P[i] - math.mean(P)) / math.std(P);
  }

  return H;
}

function cpu_CHROM(red, green, blue) {
  let vred = nj.array([red]);
  let vgreen = nj.array([green]);
  let vblue = nj.array([blue]);
  let compRed = [];
  let compGreen = [];
  let compBlue = [];

  for (let idx in vred.selection.data) {
    compRed.push(vred.selection.data[idx] * 3);
    compGreen.push(vgreen.selection.data[idx] * 2);
  }

  let Xcomp = [];
  for (let comp in compRed) {
    Xcomp.push(compRed[comp] - compGreen[comp]);
  }

  compRed = [];
  compGreen = [];
  let Ycomp = [];

  for (let idx in vred.selection.data) {
    compRed.push(vred.selection.data[idx] * 1.5);
    compGreen.push(vgreen.selection.data[idx]);
    compBlue.push(vblue.selection.data[idx] * 1.5);
  }
  for (let comp in compRed) {
    Ycomp.push(compRed[comp] + compGreen[comp] - compBlue[comp]);
  }

  let sX = math.std(Xcomp);
  let sY = math.std(Ycomp);
  let alpha = sX / sY;
  let alphaArr = [];
  for (let i = 0; i < nj.array([Xcomp]).shape[1]; i++) {
    alphaArr.push(alpha);
  }
  let multiply = multicomp(alphaArr, Ycomp);
  let bvp = [];
  for (let i = 0; i < Xcomp.length; i++) {
    bvp.push(Xcomp[i] - multiply[i]);
  }
  return bvp;
}

function multiply(a, b) {
  const transpose = (a) => a[0].map((x, i) => a.map((y) => y[i]));
  const dotproduct = (a, b) =>
    a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
  const result = (a, b) =>
    a.map((x) => transpose(b).map((y) => dotproduct(x, y)));
  return result(a, b);
}

function multicomp(a, b) {
  let resultArr = [];
  for (let i = 0; i < a.length; i++) {
    resultArr.push(a[i] * b[i]);
  }
  return resultArr;
}

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
  if (respTop + 50 < lastFrameGray.rows) {
    rect = new cv.Rect(
      Math.round(respLeft),
      Math.round(respTop),
      Math.round(boxWidth),
      50
    );
  } else {
    rect = new cv.Rect(
      Math.round(respLeft),
      Math.round(respTop),
      Math.round(boxWidth),
      respTop + 50 - lastFrameGray.rows
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
  if (respTop + 50 < lastFrameGray.rows) {
    rect = new cv.Rect(
      Math.round(respLeft),
      Math.round(respTop),
      Math.round(boxWidth),
      50
    );
  } else {
    rect = new cv.Rect(
      Math.round(respLeft),
      Math.round(respTop),
      Math.round(boxWidth),
      respTop + 50 - lastFrameGray.rows
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
      alert("Item that's not a number!");
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
