import { atom } from "recoil";

export const dataState = atom({
  key: "dataState",
  default: {
    hr: "",
    psi: "",
    msi: "",
    sdnn: "",
    rnn: "",
  },
});
