import {generateRandomString} from "../../utils/generateRandomString";
import {TItem } from "../../types/item.type";
import {Action, ActionCreator} from "redux";
import {TInitialState} from "../reducer";
import {ThunkAction} from "redux-thunk";
import axios from "axios";

export const SET_ITEMS_DATA = 'SET_ITEMS_DATA';

export type SetItemsDataAction = {
  type: typeof SET_ITEMS_DATA;
  itemsData: TItem[];
}

export const setItemsData: ActionCreator<SetItemsDataAction> = (itemsData) => ({
  type: SET_ITEMS_DATA,
  itemsData
})

export const setItemsDataAsync = (): ThunkAction<void, TInitialState, unknown, Action<string>> => (dispatch) => {
  const API_URL = process.env.REACT_APP_API_URL;

  axios.get(`${API_URL}/advert/`)
    .then((res) => {
      const items: TItem[] = res.data;
      const modifiedItems = items.map((item) => ({
        ...item,
        id: generateRandomString(),
        zoom: 16
      }));

      dispatch(setItemsData(modifiedItems));
    })
    .catch((error) => {
      console.log(error);
    })
}

