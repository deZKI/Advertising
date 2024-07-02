import {initialState} from "../reducer";
import {SET_ITEM_DATA, SetItemDataAction} from "./itemDataActions";

export type TItemDataState = {
  itemData: any;
}

type ItemDataActions = SetItemDataAction;

export const itemDataReducer = (state = initialState.itemData, action: ItemDataActions): TItemDataState => {
  switch (action.type) {
    case SET_ITEM_DATA:
      return {
        ...state,
        itemData: action.itemData
      }
    default:
      return state;
  }
}
