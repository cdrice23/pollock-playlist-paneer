import { atom } from "recoil";

export const loadingState = atom({
  key: "loading",
  default: false,
});

export const errorModalOpenState = atom({
  key: "errorModalOpen",
  default: false,
});
