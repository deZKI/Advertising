import {initialState} from "../reducer";
import {SET_TYPE_SWITCHER, SetTypeSwitcherAction} from "./typeSwitcherActions";

export type TTypeSwitcherState = {
  typeSwitcher: "high" | "middle" | "low";
}

type TypeSwitcherActions = SetTypeSwitcherAction;

export const typeSwitcherReducer = (state = initialState.typeSwitcher, action: TypeSwitcherActions): TTypeSwitcherState => {
  switch (action.type) {
    case SET_TYPE_SWITCHER:
      return {
        ...state,
        typeSwitcher: action.typeSwitcher
      }
    default:
      return state;
  }
}

