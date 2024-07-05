import React from 'react';
import styles from './paneltitle.module.css';

type TProps = {
  title: string;
  address?: string;
  subtitle?: string;
  typeSwitcher?: "high" | "middle" | "low";
  closeButton?: boolean;
  onCloseClick?: () => void;
  onChooseClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PanelTitle({ 
  title,
  address,
  subtitle,
  closeButton,
  typeSwitcher,
  onCloseClick,
  onChooseClick
}: TProps) {
  return (
    <div className={styles.container}>
      <div className={styles.title__container}>
        <h3 className={styles.title}>{title}</h3>
        {closeButton 
          ? <span className={styles.close} onClick={onCloseClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1.17677 1.17669L12.8232 12.8232M12.8232 1.17669L1.17677 12.8232" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          : <h4 className={styles.subtitle}>{subtitle}</h4> 
        }
      </div>
      {!address
        ? <div className={styles.navigation__container}>
            <button
              id="high"
              className={`
                ${styles.navigation__button}
                ${styles.navigation__button__high}
                ${typeSwitcher === "high" ? styles.navigation__button__high__active : ""}
              `}
              onClick={onChooseClick}
            >Высокий</button>
            <button
              id="middle"
              className={`
                ${styles.navigation__button}
                ${styles.navigation__button__middle}
                ${typeSwitcher === "middle" ? styles.navigation__button__middle__active : ""}
              `}
              onClick={onChooseClick}
            >Средний</button>
            <button
              id="low"
              className={`
                ${styles.navigation__button}
                ${styles.navigation__button__low}
                ${typeSwitcher === "low" ? styles.navigation__button__low__active : ""}
              `}
              onClick={onChooseClick}
            >Низкий</button>
          </div>
        : <span className={styles.address}>{address}</span>
      }
    </div>
  );
}
