import React from 'react';
import styles from './paneltitle.module.css';

type TProps = {
  title: string;
  subtitle?: string;
  closeButton?: boolean;
  onCloseClick?: () => void;
}

export default function PanelTitle({ title, subtitle, closeButton, onCloseClick }: TProps) {
  return (
    <div className={styles.container}>
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
  );
}
