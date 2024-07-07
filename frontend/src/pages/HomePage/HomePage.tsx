import React from 'react';
import styles from './homepage.module.css';
import { generateRandomCoordinates } from '../../types/generateRandomCoordinates';
import {generateRandomString} from '../../utils/generateRandomString';
import {generateRandomType} from '../../utils/generateRandomType';
import LogoImage from '../../assets/images/adspotter_logo.png';
import {TCoverageTypes} from '../../types/coverageTypes';
import {useItemsData} from '../../hooks/useItemsData';
import {TInitialState} from '../../store/reducer';
import {TCSVData} from '../../types/csvData.type';
import {TItem} from '../../types/item.type';
import {TMode} from '../../types/mode.type';
import Panel from '../../ui/Panel/Panel';
import {useSelector} from 'react-redux';
import Mode from '../../ui/Mode/Mode';
import Map from '../../ui/Map/Map';

const generateRandomList = (): TItem[] => Array.from(Array(1000).keys()).map(() => {
  return {
    id: generateRandomString(),
    type: generateRandomType(),
    address: "г. Хабаровск, ул. Карла-Маркса, д.24",
    coverage: 1,
    description: "Этот рекламный щит расположен на одной из самых оживленных улиц города, прямо в центре Хабаровска. Благодаря своему стратегическому расположению, он обеспечивает отличную видимость для пешеходов и водителей.",
    advantages: [
      {
        id: generateRandomString(),
        description: "Благодаря своему стратегическому расположению, он обеспечивает отличную видимость для пешеходов и водителей.",
      },
      {
        id: generateRandomString(),
        description: "Местные жители, туристы, офисные работники."
      },
      {
        id: generateRandomString(),
        description: "Возможность аренды на различные сроки."
      },
      {
        id: generateRandomString(),
        description: "Целевая аудитория: офисные работники."
      }
    ],
    coordinate: generateRandomCoordinates(),
    zoom: 16
  }
})

export default function HomePage() {
  const panelIsSwitched = useSelector<TInitialState, boolean>(state => state.panelIsSwitched.panelIsSwitched);
  const typeSwitcher = useSelector<TInitialState, TCoverageTypes>(state => state.typeSwitcher.typeSwitcher);
  const modeSwitcher = useSelector<TInitialState, TMode>(state => state.modeSwitcher.modeSwitcher);
  const csvData = useSelector<TInitialState, TCSVData>(state => state.csvData.csvData);
  const item = useSelector<TInitialState, TItem>(state => state.itemData.itemData);
  // const list = useItemsData();
  const list = generateRandomList();

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
