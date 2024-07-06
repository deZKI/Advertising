import {TCoverageTypes} from "../../types/coverageTypes";
import {ActionCreator} from "redux";

export const SET_TYPE_SWITCHER = 'SET_TYPE_SWITCHER';

export type SetTypeSwitcherAction = {
  type: typeof SET_TYPE_SWITCHER;
  typeSwitcher: TCoverageTypes;
}

export const setTypeSwitcher: ActionCreator<SetTypeSwitcherAction> = (typeSwitcher) => ({
  type: SET_TYPE_SWITCHER,
  typeSwitcher
})
