import {initialState} from "../reducer";
import {SET_LIST_SWITCHER, SetListSwitcherAction} from "./listSwitcherActions";

export type TListSwitcherState = {
  listSwitcher: string;
}

type ListSwitcherActions = SetListSwitcherAction;

export const listSwitcherReducer = (state = initialState.listSwitcher, action: ListSwitcherActions): TListSwitcherState => {
  switch (action.type) {
    case SET_LIST_SWITCHER:
      return {
        ...state,
        listSwitcher: action.listSwitcher
      }
    default:
      return state;
  }
}

