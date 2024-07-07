import React, { useState } from 'react';
import styles from './filter.module.css';
import {setMaxDotsData} from '../../store/maxDotsData/maxDotsDataActions';
import {setLoading} from '../../store/loading/loadingActions';
import {TMaxDotsData} from '../../types/maxDotsData.type';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { generateRandomString } from '../../utils/generateRandomString';

export default function Filter() {
  const dispatch = useDispatch();

  function handleUploadClick() {
    const API_URL = process.env.REACT_APP_API_URL;
    const data = {
      age_from: 25,
      age_to: 45,
      name: "ALL 25-45",
      income: "100000",
      gender: "all",
      iterations: 100,
      number_dots: 100
    };

    dispatch(setLoading(true));

    axios.post(`${API_URL}/optimization`, data, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      const maxDotsData: TMaxDotsData = response.data;
      const modifiedMaxDotsData = maxDotsData.max_dots.map((coordinates) => {
        return {
          ...coordinates,
          id: generateRandomString()
        }
      }) 

      dispatch(setMaxDotsData(modifiedMaxDotsData));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.error(err);
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span className={styles.description}>Количество итераций</span>
        <input className={styles.input} type="text" />
      </div>
      <div className={styles.info}>
        <div className={styles.description}>Количество щитов</div>
        <input className={styles.input} type="text" />
      </div>
      <div className={styles.info}>
        <span className={styles.description}>Доход</span>
        <input className={styles.input} type="text" />
      </div>
      <div className={styles.info}>
        <span className={styles.description}>Возраст</span>
        <span className={styles.description}>от</span>
        <input className={styles.input} type="text" />
        <span className={styles.description}>до</span>
        <input className={styles.input} type="text" />
      </div>
      <div className={styles.info}>
        <span className={styles.description}>Имя</span>
        <input className={styles.input} type="text" />
      </div>
      <div className={styles.info}>
        <span className={styles.description}>Пол</span>
        <input className={styles.input} type="text" />
      </div>
      <button className={styles.button} onClick={handleUploadClick}>
        Показать щиты
      </button>
    </div>
  );
}
