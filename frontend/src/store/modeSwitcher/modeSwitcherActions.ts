import {ActionCreator} from "redux";

export const SET_MODE_SWITCHER = 'SET_MODE_SWITCHER';

export type SetModeSwitcherAction = {
  type: typeof SET_MODE_SWITCHER;
  modeSwitcher: "banners" | "districts";
}

export const setModeSwitcher: ActionCreator<SetModeSwitcherAction> = (modeSwitcher) => ({
  type: SET_MODE_SWITCHER,
  modeSwitcher
})
