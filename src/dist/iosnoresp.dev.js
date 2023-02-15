"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("./measure.css");

require("./util/css/reset.css");

require("./util/js/format.js");

require("./util/js/grid.js");

require("./util/js/intersect.js");

require("./util/js/math.js");

require("./util/js/opencv.js");

require("./util/js/bci.min.js");

require("./util/js/fili.min.js");

require("./util/js/numjs.min.js");

require("./util/js/dygraph.min.js");

require("./util/js/lottie-player.js");

require("./util/js/rollups/hmac-md5.js");

require("./util/js/rollups/aes.js");

require("./util/js/rollups/hmac-ripemd160.js");

require("./util/js/rollups/hmac-sha1.js");

require("./util/js/rollups/hmac-sha224.js");

require("./util/js/rollups/hmac-sha256.js");

require("./util/js/rollups/hmac-sha3.js");

require("./util/js/rollups/hmac-sha384.js");

require("./util/js/rollups/hmac-sha512.js");

require("./util/js/rollups/md5.js");

require("./util/js/rollups/pbkdf2.js");

require("./util/js/rollups/rabbit.js");

require("./util/js/rollups/rabbit-legacy.js");

require("./util/js/rollups/rc4.js");

require("./util/js/rollups/ripemd160.js");

require("./util/js/rollups/sha1.js");

require("./util/js/rollups/sha224.js");

require("./util/js/rollups/sha256.js");

require("./util/js/rollups/sha3.js");

require("./util/js/rollups/sha384.js");

require("./util/js/rollups/sha512.js");

require("./util/js/rollups/tripledes.js");

var _face_mesh = require("@mediapipe/face_mesh");

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _lottieWeb = _interopRequireDefault(require("lottie-web"));

var _ani_heartrate = _interopRequireDefault(require("./util/animation/ani_heartrate.json"));

var _loading = _interopRequireDefault(require("./util/animation/loading.json"));

var _jsCircleProgress = _interopRequireDefault(require("js-circle-progress"));

var tf = _interopRequireWildcard(require("@tensorflow/tfjs"));

require("@tensorflow/tfjs-backend-wasm");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import libraries
var facemesh = require("@tensorflow-models/facemesh");

var cv = require("opencv.js");

require("@tensorflow/tfjs-backend-wasm");

tf.setBackend("wasm").then(function () {
  return main();
}); // html tag

var video = document.getElementsByClassName("input_video")[0];
var canvasElement = document.getElementsByClassName("output_canvas")[0];
var container = document.getElementsByClassName("progress-bar")[0];
var preparation = document.getElementsByClassName("Preparation")[0];
var measuring = document.getElementsByClassName("Measuring")[0];
var Modal = document.getElementsByClassName("modal")[0];
var detectedModal = document.getElementsByClassName("detected")[0];
var networkModal = document.getElementsByClassName("network")[0];
var detectedBtn = document.getElementsByClassName("detected-btn")[0];
var networkBtn = document.getElementsByClassName("network-btn")[0];
var facepred; // Animation

var AniWrapper = document.getElementsByClassName("lottie-container")[0];
var LoadingWrapper = document.getElementsByClassName("loading-wrapper")[0];
var Ani = document.createElement("div");
Ani.style.width = "14.3928035982009vh";
Ani.style.height = "8.095952023988007vh";
Ani.style.minWidth = "96px";
Ani.style.minHeight = "54px";
Ani.classList.add("container");
var Loading = document.createElement("div");
Loading.style.width = "8.995502248875562vh";
Loading.style.height = "8.995502248875562vh";
Loading.style.minWidth = "60px";
Loading.style.minHeight = "60px";
Loading.classList.add("loading");

_lottieWeb["default"].loadAnimation({
  container: Ani,
  renderer: "svg",
  loop: true,
  autoplay: true,
  animationData: _ani_heartrate["default"]
});

_lottieWeb["default"].loadAnimation({
  container: Loading,
  renderer: "svg",
  loop: true,
  autoplay: true,
  animationData: _loading["default"]
});

AniWrapper.appendChild(Ani);
LoadingWrapper.appendChild(Loading); // main();

detectedBtn.addEventListener("click", function () {
  location.href = "./measure.html";
});
networkBtn.addEventListener("click", function () {
  location.href = "./measure.html";
});
Loading.classList.remove("Loaded");
LoadingWrapper.classList.remove("remove");
preparation.classList.add("off");
measuring.classList.remove("on");
Modal.classList.remove("alert");
detectedModal.classList.remove("on");
networkModal.classList.remove("on");
var ctx = canvasElement.getContext("2d");
var url = "https://siigjmw19n.apigw.ntruss.com/face_health_estimate/v1/calculate_face_ppg_stress_cors";
var uri = "/face_health_estimate/v1/calculate_face_ppg_stress_cors";
var rgbArray = [];
var sum_red = 0;
var sum_green = 0;
var sum_blue = 0;
var mean_red = [];
var mean_green = [];
var mean_blue = []; // second * 60

var maxHistLen = 900;
var timingHist = [];
var frame = 0;
var boxLeft;
var boxTop;
var boxWidth;
var boxHeight;
var timestamp = 0;
var lastPosition;
var lastYPosition;
var positionErr = 0;
var yPositionErr = 0;
var cp = new _jsCircleProgress["default"](container, {
  value: 0,
  max: maxHistLen
});
cp; // camera handler

function setupCamera() {
  var stream;
  return regeneratorRuntime.async(function setupCamera$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              facingMode: "user",
              aspectRatio: 1.333,
              width: {
                ideal: 1280
              }
            }
          }));

        case 2:
          stream = _context.sent;
          video.srcObject = stream;
          return _context.abrupt("return", new Promise(function (resolve) {
            video.onloadedmetadata = function () {
              resolve(video);
            };
          }));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function stop() {
  var stream = video.srcObject;
  var tracks = stream.getTracks();
  tracks.forEach(function (track) {
    track.stop();
  });
}

var curFaces;
var fmesh; // main function

function main() {
  var videoWidth, videoHeight;
  return regeneratorRuntime.async(function main$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(facemesh.load({
            maxFaces: 1
          }));

        case 2:
          fmesh = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(setupCamera());

        case 5:
          videoWidth = video.videoWidth;
          videoHeight = video.videoHeight;
          video.play();

          if (timingHist < maxHistLen) {
            Loading.classList.add("Loaded");
            LoadingWrapper.classList.add("remove");
          } // Create canvas and drawing context


          canvasElement.width = videoWidth / 2;
          canvasElement.height = videoHeight / 2; // canvasElement.width = videoWidth / 20;
          // canvasElement.height = videoHeight / 20;
          // start prediction loop

          renderPrediction();

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
} // Calls face mesh on the video and outputs the eyes and face bounding boxes to global vars


function renderPrediction() {
  return regeneratorRuntime.async(function renderPrediction$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          preparation.classList.remove("off");
          _context3.next = 3;
          return regeneratorRuntime.awrap(fmesh.estimateFaces(canvasElement));

        case 3:
          facepred = _context3.sent;
          ctx.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

          if (!(facepred.length > 0)) {
            _context3.next = 9;
            break;
          }

          // If we find a face, process it
          curFaces = facepred;
          _context3.next = 9;
          return regeneratorRuntime.awrap(drawFaces());

        case 9:
          requestAnimationFrame(renderPrediction);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
} // Draws the current eyes onto the canvas, directly from video streams


function drawFaces() {
  var face_oval, left_eye, right_eye, lips, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, face, mesh, _i, _i2, _i3, _i4, _i5, _i6, _i7, faceRegion, data, i, textArr, _i8, blob, form, signature, options;

  return regeneratorRuntime.async(function drawFaces$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _lottieWeb["default"].src = "";
          ctx.strokeStyle = "cyan";
          ctx.lineWidth = 2; // curFaces = facepred;

          face_oval = [];
          left_eye = [];
          right_eye = [];
          lips = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context4.prev = 10;

          for (_iterator = curFaces[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            face = _step.value;

            if (face.faceInViewConfidence > 0.5) {
              preparation.classList.add("off");
              measuring.classList.add("on");
              mesh = face.scaledMesh;
              lastPosition = boxLeft;
              lastYPosition = boxTop; // Get the facial region of interest's bounds

              boxLeft = mesh[234][0];
              boxTop = mesh[10][1];
              boxWidth = mesh[454][0] - boxLeft;
              boxHeight = mesh[152][1] - boxTop;

              if (Math.abs(boxLeft - lastPosition) > 20) {
                positionErr++;
              }

              if (Math.abs(boxTop - lastYPosition) > 20) {
                yPositionErr++;
              } // face line, eye, mouse defined


              for (_i = 0; _i < _face_mesh.FACEMESH_FACE_OVAL.length; _i++) {
                face_oval.push(_face_mesh.FACEMESH_FACE_OVAL[_i][0], _face_mesh.FACEMESH_FACE_OVAL[_i][1]);
              }

              for (_i2 = 0; _i2 < _face_mesh.FACEMESH_RIGHT_EYE.length; _i2++) {
                right_eye.push(_face_mesh.FACEMESH_RIGHT_EYE[_i2][0], _face_mesh.FACEMESH_RIGHT_EYE[_i2][1]);
              }

              for (_i3 = 0; _i3 < _face_mesh.FACEMESH_LEFT_EYE.length; _i3++) {
                left_eye.push(_face_mesh.FACEMESH_LEFT_EYE[_i3][0], _face_mesh.FACEMESH_LEFT_EYE[_i3][1]);
              }

              for (_i4 = 0; _i4 < _face_mesh.FACEMESH_LIPS.length; _i4++) {
                lips.push(_face_mesh.FACEMESH_LIPS[_i4][0], _face_mesh.FACEMESH_LIPS[_i4][1]);
              }

              ctx.fillStyle = "white";
              ctx.globalCompositeOperation = "source-over";
              ctx.beginPath();
              ctx.moveTo(mesh[left_eye[0]][0], mesh[left_eye[0]][1]);

              for (_i5 = 0; _i5 < left_eye.length; _i5++) {
                ctx.lineTo(mesh[left_eye[_i5]][0], mesh[left_eye[_i5]][1]);
              }

              ctx.fill();
              ctx.beginPath();
              ctx.moveTo(mesh[right_eye[0]][0], mesh[right_eye[0]][1]);

              for (_i6 = 0; _i6 < right_eye.length; _i6++) {
                ctx.lineTo(mesh[right_eye[_i6]][0], mesh[right_eye[_i6]][1]);
              }

              ctx.fill();
              ctx.beginPath();
              ctx.moveTo(mesh[lips[0]][0], mesh[lips[0]][1]);

              for (_i7 = 0; _i7 < lips.length; _i7++) {
                ctx.lineTo(mesh[lips[_i7]][0], mesh[lips[_i7]][1]);
              }

              ctx.fill(); // Draw the box a bit larger for debugging purposes

              ctx.beginPath();
              ctx.rect(boxLeft, boxTop, boxWidth, boxHeight); // ctx.fill();

              ctx.stroke(); // Get the image data from that region

              faceRegion = ctx.getImageData(boxLeft, boxTop, boxWidth, boxHeight);
              data = faceRegion.data;

              for (i = 0; i < data.length; i += 4) {
                if (data[i + 1] + data[i + 2] + data[i + 3] != 765 || data[i + 1] + data[i + 2] + data[i + 3] != 0) {
                  rgbArray.push([data[i + 1], data[i + 2], data[i + 3]]);
                }
              } // Get the area into Tensorflow, then split it and average the green channel


              for (i = 0; i < rgbArray.length; i++) {
                sum_red = sum_red + rgbArray[i][0];
                sum_green = sum_green + rgbArray[i][1];
                sum_blue = sum_blue + rgbArray[i][2];
              } // Get FPS of this loop as well


              timingHist.push(String(Date.now() * 1000));
              mean_red.push(sum_red / (boxWidth * boxHeight));
              mean_green.push(sum_green / (boxWidth * boxHeight));
              mean_blue.push(sum_blue / (boxWidth * boxHeight));
              rgbArray = [];
              sum_red = 0;
              sum_green = 0;
              sum_blue = 0;
              cp.value = mean_red.length;

              if (mean_red.length > maxHistLen) {
                mean_red.shift();
                mean_green.shift();
                mean_blue.shift();
                timingHist.shift();
                textArr = [];
                stop();

                for (_i8 = 0; _i8 < maxHistLen; _i8++) {
                  textArr.push("".concat(timingHist[_i8], "\t").concat(mean_red[_i8], "\t").concat(mean_green[_i8], "\t").concat(mean_blue[_i8]));
                }

                textArr = textArr.join("\n");
                blob = new Blob([textArr], {
                  type: "text/plain"
                });
                form = new FormData();
                form.append("rgb", blob);
                form.append("age", sessionStorage.getItem("age"));
                form.append("gender", sessionStorage.getItem("gender"));
                sessionStorage.setItem("face", positionErr + yPositionErr);
                signature = makeSignature();
                options = {
                  method: "POST",
                  headers: {
                    "x-ncp-apigw-timestamp": timestamp,
                    "x-ncp-iam-access-key": "PbDvaXxkTaHf19QGViU1",
                    "x-ncp-apigw-signature-v2": signature,
                    "x-ncp-apigw-api-key": "vkqvcuTCcBtjnErVIgyDtWzdBZPhYJo1VRtUqnx4"
                  }
                };
                options.body = form;
                Loading.classList.remove("Loaded");
                LoadingWrapper.classList.remove("remove");
                Ani.classList.add("off");
                measuring.classList.remove("on");
                preparation.classList.add("off");
                fetch(url, options).then(function (response) {
                  return response.json();
                }).then(function (response) {
                  if (response.result === 200) {
                    sessionStorage.setItem("msi", response.message.mentalStress);
                    sessionStorage.setItem("psi", response.message.physicalStress);
                    sessionStorage.setItem("hr", response.message.hr);
                    location.href = "./result.html";
                  } else {
                    Modal.classList.add("alert");
                    networkModal.classList.add("on");
                  }
                })["catch"](function (err) {
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

          _context4.next = 18;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](10);
          _didIteratorError = true;
          _iteratorError = _context4.t0;

        case 18:
          _context4.prev = 18;
          _context4.prev = 19;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 21:
          _context4.prev = 21;

          if (!_didIteratorError) {
            _context4.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return _context4.finish(21);

        case 25:
          return _context4.finish(18);

        case 26:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[10, 14, 18, 26], [19,, 21, 25]]);
} // Button Handler


detectedBtn.addEventListener("click", function () {
  location.href = "./mediapipe.html";
});
networkBtn.addEventListener("click", function () {
  location.href = "./mediapipe.html";
});

function makeSignature() {
  var space = " "; // one space

  var newLine = "\n"; // new line

  var method = "POST"; // method

  var urls = uri; // url (include query string)

  timestamp = String(new Date().getTime()); // current timestamp (epoch)

  var accessKey = "PbDvaXxkTaHf19QGViU1"; // access key id (from portal or sub account)

  var secretKey = "HOAg4vr7bjzHr4OvMeAvw70Ae8nNKa6ctudDJuJy"; // secret key (from portal or sub account)

  var hmac = _cryptoJs["default"].algo.HMAC.create(_cryptoJs["default"].algo.SHA256, secretKey);

  hmac.update(method);
  hmac.update(space);
  hmac.update(urls);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);
  var hash = hmac.finalize();
  return hash.toString(_cryptoJs["default"].enc.Base64);
}