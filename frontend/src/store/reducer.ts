import {SET_PANEL_IS_SWITCHED, SetPanelIsSwitchedAction} from "./panelIsSwitched/panelIsSwitchedActions";
import {TPanelIsSwitchedState, panelIsSwitchedReducer} from "./panelIsSwitched/panelIsSwitchedReducer";
import {SET_TYPE_SWITCHER, SetTypeSwitcherAction} from "./typeSwitcher/typeSwitcherActions";
import {TTypeSwitcherState, typeSwitcherReducer} from "./typeSwitcher/typeSwitcherReducer";
import {SET_ITEMS_DATA, SetItemsDataAction} from "./itemsData/itemsDataActions";
import {TItemsDataState, itemsDataReducer} from "./itemsData/itemsDataReducer";
import {SET_ITEM_DATA, SetItemDataAction} from "./itemData/itemDataActions";
import {TItemDataState, itemDataReducer} from "./itemData/itemDataReducer";

export type TInitialState = {
  panelIsSwitched: TPanelIsSwitchedState;
  typeSwitcher: TTypeSwitcherState;
  itemsData: TItemsDataState;
  itemData: TItemDataState;
}

export const initialState: TInitialState = {
  panelIsSwitched: {
    panelIsSwitched: false
  },
  typeSwitcher: {
    typeSwitcher: "high"
  },
  itemsData: {
    itemsData: []
  },
  itemData: {
    itemData: {}
  }
}

type Actions = SetPanelIsSwitchedAction 
  | SetTypeSwitcherAction 
  | SetItemsDataAction
  | SetItemDataAction;

export const rootReducer = (state = initialState, action: Actions): TInitialState => {
  switch (action.type) {
    case SET_PANEL_IS_SWITCHED:
      return {
        ...state,
        panelIsSwitched: panelIsSwitchedReducer(state.panelIsSwitched, action)
      }
    case SET_TYPE_SWITCHER:
      return {
        ...state,
        typeSwitcher: typeSwitcherReducer(state.typeSwitcher, action)
      }
    case SET_ITEMS_DATA:
        return {
          ...state,
          itemsData: itemsDataReducer(state.itemsData, action)
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
