import React from 'react';
import styles from './coveragelist.module.css';
import classNames from 'classnames';
import {convertMetersToKilometers} from '../../utils/convertMetersToKilometers';
import {TItem} from '../../types/item.type';

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
          })}></span>
          <span className={styles.address}>{item.address}</span>
          <span className={styles.distance}>
            {convertMetersToKilometers(item.distance)}
          </span>
        </li>
      )}
    </ul>
  );
}
