import React from 'react';
import styles from './panelnavigation.module.css';
import {TCoverageTypes} from '../../types/coverageTypes';

type TProps = {
  address?: string;
  typeSwitcher?: TCoverageTypes;
  panelIsSwitched: boolean;
  onChooseClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; 
}

export default function PanelNavigation({ address, typeSwitcher, panelIsSwitched, onChooseClick }: TProps) {
  return (
    <>
      {!panelIsSwitched
        ? <div className={styles.container}>
            <button
              id="high"
              className={`
                ${styles.button} ${styles.button__high}
                ${typeSwitcher === "high" ? styles.button__high__active : ""}
              `}
              onClick={onChooseClick}
            >Высокий</button>
            <button
              id="middle"
              className={`
                ${styles.button} ${styles.button__middle}
                ${typeSwitcher === "middle" ? styles.button__middle__active : ""}
              `}
              onClick={onChooseClick}
            >Средний</button>
            <button
              id="low"
              className={`
                ${styles.button} ${styles.button__low}
                ${typeSwitcher === "low" ? styles.button__low__active : ""}
              `}
              onClick={onChooseClick}
            >Низкий</button>
          </div>
        : <span className={styles.address}>{address}</span>
      }
    </>
  );
}
