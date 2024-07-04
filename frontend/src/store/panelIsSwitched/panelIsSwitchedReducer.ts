import {initialState} from "../reducer";
import {SET_PANEL_IS_SWITCHED, SetPanelIsSwitchedAction} from "./panelIsSwitchedActions";

export type TPanelIsSwitchedState = {
  panelIsSwitched: boolean;
}

type PanelIsSwitchedActions = SetPanelIsSwitchedAction;

export const panelIsSwitchedReducer = (state = initialState.panelIsSwitched, action: PanelIsSwitchedActions): TPanelIsSwitchedState => {
  switch (action.type) {
    case SET_PANEL_IS_SWITCHED:
      return {
        ...state,
        panelIsSwitched: action.panelIsSwitched
      }
    default:
      return state;
  }
}
