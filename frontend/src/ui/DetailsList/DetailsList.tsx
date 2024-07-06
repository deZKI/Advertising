import React from 'react';
import styles from './detailslist.module.css';
import {TAdvantages} from '../../types/advantages.type';
import classNames from 'classnames';
import { TCoverageTypes } from '../../types/coverageTypes';
import { defineTypeOfCoverage } from '../../utils/defineTypeOfCoverage';

type TProps = {
  coverage: number;
  advantages: TAdvantages[];
  description: string;
  typeSwitcher: TCoverageTypes;
}

export default function DetailsList({ coverage, description, advantages, typeSwitcher }: TProps) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h4 className={styles.title}>Охват</h4>
        <div className={styles.coverage}>
          <span className={classNames(styles.coverage__circle, {
            [styles.coverage__circle__high]: typeSwitcher === 'high',
            [styles.coverage__circle__middle]: typeSwitcher === 'middle',
            [styles.coverage__circle__low]: typeSwitcher === 'low',
          })}></span>
          <span className={styles.coverage__title}>{defineTypeOfCoverage(typeSwitcher)}</span>
          <span className={styles.coverage__description}>&lt; {coverage} человек</span>
        </div>
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>Описание</h4>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>Преимущества</h4>
        <ul className={styles.list}>
          {advantages.map((advantage) =>
            <li className={styles.advantage__item} key={advantage.id}>
              <span className={styles.advantage__circle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <circle cx="4" cy="4" r="4" fill="white"/>
                </svg>
              </span>
              <span className={styles.advantage__description}>{advantage.description}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
