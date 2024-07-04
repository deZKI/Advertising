import React from 'react';
import styles from './panel.module.css';
import {setPanelIsSwitched} from '../../store/panelIsSwitched/panelIsSwitchedActions';
import {setListSwitcher} from '../../store/listSwitcher/listSwitcherActions';
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
  const listSwitcher = useSelector<TInitialState, string>(state => state.listSwitcher.listSwitcher);
  const item = useSelector<TInitialState, TItem>(state => state.itemData.itemData);
  const dispatch = useDispatch();

  function handleOpenClick(e: React.MouseEvent<HTMLElement>) {
    const itemID = e.currentTarget.id;
    const item = list.find((item) => item.id === itemID);

    dispatch(setPanelIsSwitched(true));
    dispatch(setItemData(item));
  }

  function handleChooseClick(e: React.MouseEvent<HTMLButtonElement>) {
    const buttonID = e.currentTarget.id
    dispatch(setListSwitcher(buttonID));
  }

  function handleCloseClick() {
    dispatch(setPanelIsSwitched(false));
  }

  return (
    <div className={styles.panel}>
      {!panelIsSwitched
        ? <PanelTitle
            title='Рекламные щиты'
            subtitle='по охвату'
            listSwitcher={listSwitcher}
            onChooseClick={handleChooseClick}
          />
        : <PanelTitle
            title={`Рекламный щит ${item.id}`}
            closeButton={true}
            address={item.address}
            onCloseClick={handleCloseClick}
            onChooseClick={handleChooseClick}
          /> 
      }
      {!panelIsSwitched
        ? <div className={styles.list}>
            {listSwitcher === "navigation__button__high"
              ? <CoverageList 
                  list={list.filter((item) => item.type === "high")} 
                  onOpenClick={handleOpenClick}
                />
              : ""
            }
            {listSwitcher === "navigation__button__middle"
              ? <CoverageList 
                  list={list.filter((item) => item.type === "middle")} 
                  onOpenClick={handleOpenClick}
                />
              : ""
            }
            {listSwitcher === "navigation__button__low"
              ? <CoverageList 
                  list={list.filter((item) => item.type === "low")} 
                  onOpenClick={handleOpenClick}
                />
              : ""
            }
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
