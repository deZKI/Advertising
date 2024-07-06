import {useEffect } from 'react';
import {setItemsDataAsync} from '../store/itemsData/itemsDataActions';
import {useDispatch, useSelector } from "react-redux";
import {TInitialState} from "../store/reducer";
import {ThunkDispatch} from "redux-thunk";
import {TItem} from '../types/item.type';
import {AnyAction} from "redux";

export function useItemsData() {
  const accounts = useSelector<TInitialState, TItem[]>(state => state.itemsData.itemsData);
  const dispatch = useDispatch<ThunkDispatch<TInitialState, void, AnyAction>>();

  useEffect(() => {
    dispatch(setItemsDataAsync());
  }, []);

  return accounts;
}
