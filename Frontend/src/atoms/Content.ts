import { atom } from "recoil";

export const ContentState = atom({
  key: "counterState", // Unique key for the atom
  default: {
    title: "",
    link: "",
    type: "",
    Contentfile: "",
    tags: [],
  }, // Default value
});
