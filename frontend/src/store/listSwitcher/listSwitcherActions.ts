import {ActionCreator} from "redux";

export const SET_LIST_SWITCHER = 'SET_LIST_SWITCHER';

export type SetListSwitcherAction = {
  type: typeof SET_LIST_SWITCHER;
  listSwitcher: string;
}

export const setListSwitcher: ActionCreator<SetListSwitcherAction> = (listSwitcher) => ({
  type: SET_LIST_SWITCHER,
  listSwitcher
})
