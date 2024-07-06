import {initialState} from "../reducer";
import {SET_MODE_SWITCHER, SetModeSwitcherAction} from "./modeSwitcherActions";

export type TModeSwitcherState = {
  modeSwitcher: "banners" | "districts";
}

type ModeSwitcherActions = SetModeSwitcherAction;

export const modeSwitcherReducer = (state = initialState.modeSwitcher, action: ModeSwitcherActions): TModeSwitcherState => {
  switch (action.type) {
    case SET_MODE_SWITCHER:
      return {
        ...state,
        modeSwitcher: action.modeSwitcher
      }
    default:
      return state;
  }
}
