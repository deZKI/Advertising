import React from 'react';
import styles from './homepage.module.css';
import LogoImage from '../../assets/images/adspotter_logo.png';
import {TCoverageTypes} from '../../types/coverageTypes';
import {useItemsData} from '../../hooks/useItemsData';
import {TInitialState} from '../../store/reducer';
import {TCSVData} from '../../types/csvData.type';
import {TItem} from '../../types/item.type';
import Panel from '../../ui/Panel/Panel';
import {useSelector} from 'react-redux';
import Mode from '../../ui/Mode/Mode';
import Map from '../../ui/Map/Map';
import { TMode } from '../../types/mode.type';

export default function HomePage() {
  const panelIsSwitched = useSelector<TInitialState, boolean>(state => state.panelIsSwitched.panelIsSwitched);
  const typeSwitcher = useSelector<TInitialState, TCoverageTypes>(state => state.typeSwitcher.typeSwitcher);
  const modeSwitcher = useSelector<TInitialState, TMode>(state => state.modeSwitcher.modeSwitcher);
  const csvData = useSelector<TInitialState, TCSVData>(state => state.csvData.csvData);
  const item = useSelector<TInitialState, TItem>(state => state.itemData.itemData);
  const list = useItemsData();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <a className={styles.link} href="/">
            <img className={styles.image} src={LogoImage} alt="логотип" />
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <Mode />
        <Panel
          item={item}
          list={list}
          csvData={csvData}
          typeSwitcher={typeSwitcher}
          modeSwitcher={modeSwitcher}
          panelIsSwitched={panelIsSwitched}
        />
        <Map 
          item={item}
          list={list.filter((item) => item.type === typeSwitcher)}
          csvData={csvData}
          modeSwitcher={modeSwitcher}
          panelIsSwitched={panelIsSwitched}
        />
      </main>
    </>
  );
}
