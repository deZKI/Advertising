import {SET_TYPE_SWITCHER, SetTypeSwitcherAction} from "./typeSwitcherActions";
import {TCoverageTypes} from "../../types/coverageTypes";
import {initialState} from "../reducer";

export type TTypeSwitcherState = {
  typeSwitcher: TCoverageTypes;
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
