"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _recoil = require("recoil");

var _age = require("../store/age");

var _gender = require("../store/gender");

var _hr = require("../store/hr");

var _msi = require("../store/msi");

var _psi = require("../store/psi");

var _resp = require("../store/resp");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useMeasurement = function useMeasurement() {
  var _useRecoilState = (0, _recoil.useRecoilState)(_hr.hrState),
      _useRecoilState2 = _slicedToArray(_useRecoilState, 2),
      hrRecoil = _useRecoilState2[0],
      setHrRecoil = _useRecoilState2[1];

  var _useRecoilState3 = (0, _recoil.useRecoilState)(_psi.psiState),
      _useRecoilState4 = _slicedToArray(_useRecoilState3, 2),
      psiRecoil = _useRecoilState4[0],
      setPsiRecoil = _useRecoilState4[1];

  var _useRecoilState5 = (0, _recoil.useRecoilState)(_msi.msiState),
      _useRecoilState6 = _slicedToArray(_useRecoilState5, 2),
      msiRecoil = _useRecoilState6[0],
      setMsiRecoil = _useRecoilState6[1];

  var _useRecoilState7 = (0, _recoil.useRecoilState)(_resp.respState),
      _useRecoilState8 = _slicedToArray(_useRecoilState7, 2),
      respRecoil = _useRecoilState8[0],
      setRespRecoil = _useRecoilState8[1];

  var _useRecoilState9 = (0, _recoil.useRecoilState)(_age.ageState),
      _useRecoilState10 = _slicedToArray(_useRecoilState9, 2),
      ageRecoil = _useRecoilState10[0],
      setAgeRecoil = _useRecoilState10[1];

  var _useRecoilState11 = (0, _recoil.useRecoilState)(_gender.genderState),
      _useRecoilState12 = _slicedToArray(_useRecoilState11, 2),
      genderRecoil = _useRecoilState12[0],
      setGenderRecoil = _useRecoilState12[1];

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      measuring = _useState2[0],
      setMeasuring = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      noDetected = _useState4[0],
      setNoDetected = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      noNetwork = _useState6[0],
      setNoNetwork = _useState6[1];

  var navigator = (0, _reactRouterDom.useNavigate)();

  var getDataFnc = function getDataFnc(hr, mentalStress, physicalStress) {
    console.log(hr, mentalStress, physicalStress);
    setHrRecoil(hr);
    setPsiRecoil(physicalStress);
    setMsiRecoil(mentalStress);

    if (hr !== 0) {
      navigator("/result");
    }
  };

  var handleMeasuring = function handleMeasuring() {
    setMeasuring(true);
  };

  var handleNetworkErr = function handleNetworkErr() {
    setNoNetwork(true);
  };

  var handleDetectedErr = function handleDetectedErr() {
    setNoDetected(true);
  };

  var handleClickErrBtn = function handleClickErrBtn() {
    navigator("/measure");
  };

  var handleClickPrev = function handleClickPrev() {
    navigator(-1);
  };

  var handleClickResultBtn = function handleClickResultBtn() {
    navigator("/result");
  };

  return {
    measuring: measuring,
    noDetected: noDetected,
    noNetwork: noNetwork,
    ageRecoil: ageRecoil,
    genderRecoil: genderRecoil,
    getDataFnc: getDataFnc,
    handleMeasuring: handleMeasuring,
    handleNetworkErr: handleNetworkErr,
    handleDetectedErr: handleDetectedErr,
    handleClickErrBtn: handleClickErrBtn,
    handleClickPrev: handleClickPrev,
    handleClickResultBtn: handleClickResultBtn
  };
};

var _default = useMeasurement;
exports["default"] = _default;