import React from 'react';
import styles from './detailslist.module.css';
import {formatPhoneNumber} from '../../utils/formatPhoneNumber';
import {TAdvantages} from '../../types/advantages.type';
import {TContacts} from '../../types/contacts.type';
import classNames from 'classnames';

type TProps = {
  type: string;
  coverage: number;
  contacts: TContacts[];
  advantages: TAdvantages[];
  description: string;
  onZoomClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function DetailsList({ type, coverage, description, advantages, contacts }: TProps) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h4 className={styles.title}>Охват</h4>
        <div className={styles.coverage}>
          <span className={classNames(styles.coverage__circle, {
            [styles.coverage__circle__high]: type === 'high',
            [styles.coverage__circle__middle]: type === 'middle',
            [styles.coverage__circle__low]: type === 'low',
          })}></span>
          <span className={styles.coverage__title}>
            {type === "high" ? "Высокий" : ""}
            {type === "middle" ? "Средний" : ""}
            {type === "low" ? "Низкий" : ""}
          </span>
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
      <div className={styles.info}>
        <h4 className={styles.title}>Контактная информация</h4>
        <ul className={styles.list}>
          {contacts.map((contact) =>
            <li className={styles.contact__item} key={contact.id}>
              <span className={styles.name}>{contact.name}</span>
              <span className={styles.contact}>
                {formatPhoneNumber(contact.description)}
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
