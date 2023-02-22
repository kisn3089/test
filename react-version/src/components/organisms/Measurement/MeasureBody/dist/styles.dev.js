"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrMessage = exports.ErrBox = exports.Modal = exports.MeasuringCommentWrapper = exports.PrepareCommentWrapper = exports.ProgressWraaper = exports.StyledMeasureBody = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 25.337331334332834vh;\n  min-height: 169px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-bottom: 1px solid rgba(230, 230, 230, 1);\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  width: 50.22488755622189vh;\n  height: 34.48275862068966vh;\n  min-width: 335px;\n  min-height: 230px;\n  background: #ffffff;\n  border-radius: 20px;\n  overflow: hidden;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  width: 56.22188905547227vh;\n  min-width: 375px;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.8);\n  position: absolute;\n  top: 0;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 999;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  width: 50.22488755622189vh;\n  height: 35.98200899550225vh;\n  min-width: 335px;\n  min-height: 240px;\n  background-color: #fff;\n  border-radius: 20px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  bottom: 4.497751124437781vh;\n  /* left: 2.9985007496251876vh; */\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 999;\n\n  span {\n    height: 3.598200899550225vh;\n    min-height: 24px;\n    font-family: \"notoSansLight\";\n    font-size: 2.39880059970015vh;\n  }\n\n  .bpm {\n    /* width: 10.794602698650674vh;\n    height: 4.497751124437781vh;\n    min-width: 72px;\n    min-height: 30px; */\n    font-size: 2.9985007496251876vh;\n    font-family: \"notoSansBold\";\n    margin-bottom: 1.7991004497751124vh;\n    color: #006fad;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  width: 50.22488755622189vh;\n  height: 21.73913043478261vh;\n  min-width: 335px;\n  min-height: 145px;\n  background-color: #fff;\n  border-radius: 20px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  bottom: 4.497751124437781vh;\n  /* left: 2.9985007496251876vh; */\n  left: 50%;\n  transform: translateX(-50%);\n\n  span {\n    height: 3.598200899550225vh;\n    min-height: 24px;\n    font-family: \"notoSansLight\";\n    font-size: 2.39880059970015vh;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width: 40.47976011994003vh;\n  height: 40.47976011994003vh;\n  min-width: 270px;\n  min-height: 270px;\n  position: absolute;\n  top: 9.745127436281859vh;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 333;\n\n  .rotating {\n    width: 100%;\n    height: 100%;\n\n    path {\n      width: 100%;\n      height: 100%;\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 56.22188905547227vh;\n  min-width: 375px;\n  height: calc(100vh - 9.745127436281859vh);\n  min-height: calc(100vh - 44px);\n  position: relative;\n  margin: 0 auto;\n\n  /* video,\n  canvas {\n    width: 100%;\n    height: 100%;\n    box-sizing: border-box;\n  } */\n\n  .output_canvas {\n    /* display: none; */\n    /* position: absolute; */\n    top: 0;\n    left: 0;\n  }\n\n  .output_canvas2 {\n    position: absolute;\n    left: 0;\n    top: 0;\n    z-index: 999;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledMeasureBody = _styledComponents["default"].div(_templateObject());

exports.StyledMeasureBody = StyledMeasureBody;

var ProgressWraaper = _styledComponents["default"].div(_templateObject2());

exports.ProgressWraaper = ProgressWraaper;

var PrepareCommentWrapper = _styledComponents["default"].div(_templateObject3());

exports.PrepareCommentWrapper = PrepareCommentWrapper;

var MeasuringCommentWrapper = _styledComponents["default"].div(_templateObject4());

exports.MeasuringCommentWrapper = MeasuringCommentWrapper;

var Modal = _styledComponents["default"].div(_templateObject5());

exports.Modal = Modal;

var ErrBox = _styledComponents["default"].div(_templateObject6());

exports.ErrBox = ErrBox;

var ErrMessage = _styledComponents["default"].div(_templateObject7());

exports.ErrMessage = ErrMessage;