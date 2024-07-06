import React from 'react';
import styles from './panel.module.css';
import {setPanelIsSwitched} from '../../store/panelIsSwitched/panelIsSwitchedActions';
import {setTypeSwitcher} from '../../store/typeSwitcher/typeSwitcherActions';
import PanelUplaodButton from '../PanelUploadButton/PanelUplaodButton';
import {setItemData} from '../../store/itemData/itemDataActions';
import PanelNavigation from '../PanelNavigation/PanelNavigation';
import AnalyticsList from '../AnalyticsList/AnalyticsList';
import {TCoverageTypes} from '../../types/coverageTypes';
import PanelTitle from '../../ui/PanelTitle/PanelTitle';
import CoverageList from '../CoverageList/CoverageList';
import DetailsList from '../DetailsList/DetailsList';
import {TCSVData} from '../../types/csvData.type';
import {TItem} from '../../types/item.type';
import {TMode} from '../../types/mode.type';
import {useDispatch} from 'react-redux';

type TPanel = {
  item: TItem;
  list: TItem[];
  csvData: TCSVData;
  typeSwitcher: TCoverageTypes;
  modeSwitcher: TMode;
  panelIsSwitched: boolean;
}

export default function Panel({
  item,
  list,
  csvData,
  typeSwitcher,
  modeSwitcher,
  panelIsSwitched
}: TPanel) {
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

  return (
    <div className={styles.panel}>
      {Object.keys(csvData).length !== 0
        ? modeSwitcher === "districts"
            ? <>
                <div className={styles.header}>
                  {!panelIsSwitched
                    ? <PanelTitle title='Рекламные щиты' subtitle='по охвату' />
                    : <PanelTitle title='Рекламный щит' closeButton={true} onCloseClick={handleCloseClick} /> 
                  }
                  <PanelNavigation
                    address={item.address}
                    typeSwitcher={typeSwitcher}
                    panelIsSwitched={panelIsSwitched}
                    onChooseClick={handleChooseClick}
                  />
                </div>
                {!panelIsSwitched
                  ? <CoverageList 
                      list={list.filter((item) => item.type === typeSwitcher)} 
                      onOpenClick={handleOpenClick}
                    />
                  : <DetailsList 
                      coverage={item.coverage}
                      typeSwitcher={typeSwitcher}
                      description={item.description}
                      advantages={item.advantages}
                    />
                }
              </>
            : <>
                <div className={styles.header}>
                  <PanelTitle title='Рекламные щиты' subtitle='по охвату' />
                </div>
                <AnalyticsList csvData={csvData} />
              </>
        : <PanelUplaodButton />
      }
    </div>
  )
}
