import { atom } from "recoil";

export const generatedImageState = atom({
  key: "generatedImage",
  default: "",
});

export const loadingState = atom({
  key: "loading",
  default: false,
});

export const colorPromptState = atom({
  key: "colorPrompt",
  default: "",
});

export const errorModalOpenState = atom({
  key: "errorModalOpen",
  default: false,
});
