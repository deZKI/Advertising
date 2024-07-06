import {SET_PANEL_IS_SWITCHED, SetPanelIsSwitchedAction} from "./panelIsSwitched/panelIsSwitchedActions";
import {TPanelIsSwitchedState, panelIsSwitchedReducer} from "./panelIsSwitched/panelIsSwitchedReducer";
import {SET_TYPE_SWITCHER, SetTypeSwitcherAction} from "./typeSwitcher/typeSwitcherActions";
import {SET_MODE_SWITCHER, SetModeSwitcherAction} from "./modeSwitcher/modeSwitcherActions";
import {TTypeSwitcherState, typeSwitcherReducer} from "./typeSwitcher/typeSwitcherReducer";
import {TModeSwitcherState, modeSwitcherReducer} from "./modeSwitcher/modeSwitcherReducer";
import {SET_ITEMS_DATA, SetItemsDataAction} from "./itemsData/itemsDataActions";
import {TItemsDataState, itemsDataReducer} from "./itemsData/itemsDataReducer";
import {SET_ITEM_DATA, SetItemDataAction} from "./itemData/itemDataActions";
import {TItemDataState, itemDataReducer} from "./itemData/itemDataReducer";
import {SET_CSV_DATA, SetCSVDataAction} from "./csvData/csvDataActions";
import {TCSVDataState, csvDataReducer} from "./csvData/csvDataReducer";

export type TInitialState = {
  panelIsSwitched: TPanelIsSwitchedState;
  typeSwitcher: TTypeSwitcherState;
  modeSwitcher: TModeSwitcherState;
  itemsData: TItemsDataState;
  itemData: TItemDataState;
  csvData: TCSVDataState;
}

export const initialState: TInitialState = {
  panelIsSwitched: {
    panelIsSwitched: false
  },
  typeSwitcher: {
    typeSwitcher: "high"
  },
  modeSwitcher: {
    modeSwitcher: "banners"
  },
  itemsData: {
    itemsData: []
  },
  itemData: {
    itemData: {}
  },  
  csvData: {
    csvData: {}
  },
}

type Actions = SetPanelIsSwitchedAction 
  | SetTypeSwitcherAction 
  | SetModeSwitcherAction
  | SetItemsDataAction
  | SetItemDataAction
  | SetCSVDataAction

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
    case SET_MODE_SWITCHER:
      return {
        ...state,
        modeSwitcher: modeSwitcherReducer(state.modeSwitcher, action)
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
    case SET_CSV_DATA:
      return {
        ...state,
        csvData: csvDataReducer(state.csvData, action)
      }
    default:
      return state;
  }
}
