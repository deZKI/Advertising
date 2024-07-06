import React from 'react';
import styles from './coveragelist.module.css';
import {TItem} from '../../types/item.type';
import classNames from 'classnames';

type TProps = {
  list: TItem[];
  onOpenClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function CoverageList({ list, onOpenClick }: TProps) { 
  return (
    <ul className={styles.list}>
      {list.map((item) => 
        <li id={`${item.id}`} className={styles.item} key={item.id} onClick={onOpenClick}>
          <span className={classNames(styles.circle, {
            [styles.circle__high]: item.type === 'high',
            [styles.circle__middle]: item.type === 'middle',
            [styles.circle__low]: item.type === 'low',
          })}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="10" fill="#56D941"/>
            </svg>
          </span>
          <span className={styles.address}>{item.address}</span>
        </li>
      )}
    </ul>
  );
}
