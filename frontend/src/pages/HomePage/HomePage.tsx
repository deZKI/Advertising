import React from 'react';
import styles from './homepage.module.css';
import LogoImage from '../../assets/images/adspotter_logo.png';
import {useItemsData} from '../../hooks/useItemsData';
import {TInitialState} from '../../store/reducer';
import {TItem} from '../../types/item.type';
import Panel from '../../ui/Panel/Panel';
import {useSelector} from 'react-redux';
import Map from '../../ui/Map/Map';

export default function HomePage() {
  const typeSwitcher = useSelector<TInitialState, "high" | "middle" | "low">(state => state.typeSwitcher.typeSwitcher);
  const panelIsSwitched = useSelector<TInitialState, boolean>(state => state.panelIsSwitched.panelIsSwitched);
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
        <Panel
          item={item}
          list={list}
          typeSwitcher={typeSwitcher}
          panelIsSwitched={panelIsSwitched}
        />
        <Map 
          item={item}
          list={list.filter((item) => item.type === typeSwitcher)}
          panelIsSwitched={panelIsSwitched}
        />
      </main>
    </>
  );
}
