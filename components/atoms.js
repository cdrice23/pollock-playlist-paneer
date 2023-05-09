import { atom } from "recoil";

export const loadingState = atom({
  key: "loading",
  default: false,
});

// export const userColorsState = atom({
//   key: "userColors",
//   default: [],
// });

// export const userTopArtistsState = atom({
//   key: "userTopArtists",
//   default: [],
// });

export const errorModalOpenState = atom({
  key: "errorModalOpen",
  default: false,
});
