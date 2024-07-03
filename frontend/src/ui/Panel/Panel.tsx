import React from 'react';
import styles from './panel.module.css';
import {setPanelIsSwitched} from '../../store/panelIsSwitched/panelIsSwitchedActions';
import {setItemData} from '../../store/itemData/itemDataActions';
import PanelTitle from '../../ui/PanelTitle/PanelTitle';
import CoverageList from '../CoverageList/CoverageList';
import DetailsList from '../DetailsList/DetailsList';
import {useSelector, useDispatch} from 'react-redux';
import {TInitialState} from '../../store/reducer';
import {TItem} from '../../types/item.type';

type TPanel = {
  list: TItem[];
}

export default function Panel({ list }: TPanel) {
  const panelIsSwitched = useSelector<TInitialState, boolean>(state => state.panelIsSwitched.panelIsSwitched);
  const item = useSelector<TInitialState, TItem>(state => state.itemData.itemData);
  const dispatch = useDispatch();

  function handleCloseClick() {
    dispatch(setPanelIsSwitched(false));
  }

  function handleOpenClick(e: React.MouseEvent<HTMLElement>) {
    const itemID = e.currentTarget.id;
    const item = list.find((item) => item.id === itemID);

    dispatch(setPanelIsSwitched(true));
    dispatch(setItemData(item));
  }

  return (
    <div className={styles.panel}>
      {!panelIsSwitched
        ? <PanelTitle title='Рекламные щиты' subtitle='по охвату' />
        : <PanelTitle 
            title={`Рекламный щит ${item.id}`} 
            closeButton={true} 
            address={item.address}
            onCloseClick={handleCloseClick} 
          /> 
      }
      {!panelIsSwitched
        ? <div className={styles.list}>
            <CoverageList 
              text='Высокий' 
              type='high' 
              list={list.filter((item) => item.type === "high")}
              onOpenClick={handleOpenClick}
            />
            <CoverageList 
              text='Средний' 
              type='middle' 
              list={list.filter((item) => item.type === "middle")}
              onOpenClick={handleOpenClick} 
            />
            <CoverageList 
              text='Низкий' 
              type='low' 
              list={list.filter((item) => item.type === "low")} 
              onOpenClick={handleOpenClick}
            />
          </div>
        : <DetailsList 
            type={item.type}
            coverage={item.coverage}
            description={item.description}
            advantages={item.advantages}
            contacts={item.contacts}
          />
      }
    </div>
  )
}
