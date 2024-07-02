import {IPanelIsSwitchedState, panelIsSwitchedReducer} from "./panelIsSwitched/panelIsSwitchedReducer";
import {SET_PANEL_IS_SWITCHED, SetPanelIsSwitchedAction} from "./panelIsSwitched/panelIsSwitchedActions";
import {TItemDataState, itemDataReducer} from "./itemData/itemDataReducer";
import {SET_ITEM_DATA, SetItemDataAction} from "./itemData/itemDataActions";

export type TInitialState = {
  panelIsSwitched: IPanelIsSwitchedState;
  itemData: TItemDataState;
}

export const initialState: TInitialState = {
  panelIsSwitched: {
    panelIsSwitched: false
  },
  itemData: {
    itemData: {}
  }
}

type Actions = SetPanelIsSwitchedAction | SetItemDataAction;

export const rootReducer = (state = initialState, action: Actions): TInitialState => {
  switch (action.type) {
    case SET_PANEL_IS_SWITCHED:
      return {
        ...state,
        panelIsSwitched: panelIsSwitchedReducer(state.panelIsSwitched, action)
      }
    case SET_ITEM_DATA:
      return {
        ...state,
        itemData: itemDataReducer(state.itemData, action)
      }
    default:
      return state;
  }
}
