import {SET_ITEMS_DATA, SetItemsDataAction} from "./itemsDataActions";
import {TItem} from "../../types/item.type";
import {initialState} from "../reducer";

export type TItemsDataState = {
  itemsData: TItem[];
}

type ItemsDataActions = SetItemsDataAction;

export const itemsDataReducer = (state = initialState.itemsData, action: ItemsDataActions): TItemsDataState => {
  switch (action.type) {
    case SET_ITEMS_DATA:
      return {
        ...state,
        itemsData: action.itemsData
      }
    default:
      return state;
  }
}

