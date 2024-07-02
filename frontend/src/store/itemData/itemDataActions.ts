import {ActionCreator} from "redux";
import {TItem} from "../../types/item.type";

export const SET_ITEM_DATA = 'SET_ITEM_DATA';

export type SetItemDataAction = {
  type: typeof SET_ITEM_DATA;
  itemData: TItem;
}

export const setItemData: ActionCreator<SetItemDataAction> = (itemData) => ({
  type: SET_ITEM_DATA,
  itemData
})
