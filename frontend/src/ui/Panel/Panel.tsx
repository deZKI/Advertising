import React from 'react';
import styles from './panel.module.css';
import {setPanelIsSwitched} from '../../store/panelIsSwitched/panelIsSwitchedActions';
import {setTypeSwitcher} from '../../store/typeSwitcher/typeSwitcherActions';
import {setItemData} from '../../store/itemData/itemDataActions';
import PanelTitle from '../../ui/PanelTitle/PanelTitle';
import CoverageList from '../CoverageList/CoverageList';
import DetailsList from '../DetailsList/DetailsList';
import {TItem} from '../../types/item.type';
import {useDispatch} from 'react-redux';

type TPanel = {
  item: TItem;
  list: TItem[];
  typeSwitcher: "high" | "middle" | "low";
  panelIsSwitched: boolean;
}

export default function Panel({ item, list, typeSwitcher, panelIsSwitched }: TPanel) {
  const dispatch = useDispatch();

  function handleOpenClick(e: React.MouseEvent<HTMLElement>) {
    const itemID = e.currentTarget.id;
    const item = list.find((item) => item.id === itemID);

    dispatch(setPanelIsSwitched(true));
    dispatch(setItemData(item));
  }

  function handleChooseClick(e: React.MouseEvent<HTMLButtonElement>) {
    const buttonID = e.currentTarget.id;
    dispatch(setTypeSwitcher(buttonID));
  }

  function handleCloseClick() {
    dispatch(setPanelIsSwitched(false));
  }

  function handleZoomClick(e: React.MouseEvent<HTMLButtonElement>) {
    // const buttonID = e.currentTarget.id;
  }

  return (
    <div className={styles.panel}>
      {!panelIsSwitched
        ? <PanelTitle
            title='Рекламные щиты'
            subtitle='по охвату'
            typeSwitcher={typeSwitcher}
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
            {typeSwitcher === "high"
              ? <CoverageList 
                  list={list.filter((item) => item.type === "high")} 
                  onOpenClick={handleOpenClick}
                />
              : ""
            }
            {typeSwitcher === "middle"
              ? <CoverageList 
                  list={list.filter((item) => item.type === "middle")} 
                  onOpenClick={handleOpenClick}
                />
              : ""
            }
            {typeSwitcher === "low"
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
            onZoomClick={handleZoomClick}
          />
      }
    </div>
  )
}
