import { atom } from "recoil";

export const dataState = atom({
  key: "dataState",
  default: {
    psi: "",
    msi: "",
    sdnn: "",
    rnn: "",
  },
});
