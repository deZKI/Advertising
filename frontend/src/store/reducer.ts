import {SET_PANEL_IS_SWITCHED, SetPanelIsSwitchedAction} from "./panelIsSwitched/panelIsSwitchedActions";
import {TPanelIsSwitchedState, panelIsSwitchedReducer} from "./panelIsSwitched/panelIsSwitchedReducer";
import {SET_LIST_SWITCHER, SetListSwitcherAction} from "./listSwitcher/listSwitcherActions";
import {TListSwitcherState, listSwitcherReducer} from "./listSwitcher/listSwitcherReducer";
import {SET_ITEM_DATA, SetItemDataAction} from "./itemData/itemDataActions";
import {TItemDataState, itemDataReducer} from "./itemData/itemDataReducer";

export type TInitialState = {
  panelIsSwitched: TPanelIsSwitchedState;
  listSwitcher: TListSwitcherState;
  itemData: TItemDataState;
}

export const initialState: TInitialState = {
  panelIsSwitched: {
    panelIsSwitched: false
  },
  listSwitcher: {
    listSwitcher: "navigation__button__high"
  },
  itemData: {
    itemData: {}
  }
}

type Actions = SetPanelIsSwitchedAction | SetListSwitcherAction | SetItemDataAction;

export const rootReducer = (state = initialState, action: Actions): TInitialState => {
  switch (action.type) {
    case SET_PANEL_IS_SWITCHED:
      return {
        ...state,
        panelIsSwitched: panelIsSwitchedReducer(state.panelIsSwitched, action)
      }
    case SET_LIST_SWITCHER:
      return {
        ...state,
        listSwitcher: listSwitcherReducer(state.listSwitcher, action)
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
