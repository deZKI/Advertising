import React, { useState } from 'react';
import styles from './filter.module.css';
import {setMaxDotsData} from '../../store/maxDotsData/maxDotsDataActions';
import {generateRandomString} from '../../utils/generateRandomString';
import {setLoading} from '../../store/loading/loadingActions';
import {TMaxDotsData} from '../../types/maxDotsData.type';
import {useDispatch} from 'react-redux';
import axios from 'axios';

export default function Filter() {
  const [age_from, setAgeFrom] = useState('');
  const [age_to, setAgeTo] = useState('');
  const [name, setName] = useState('');
  const [income, setIncome] = useState('');
  const [gender, setGender] = useState('');
  const [iterations, setIterations] = useState('');
  const [numberDots, setNumberDots] = useState('');
  const dispatch = useDispatch();

  function handleAgeFromChange(e: React.FormEvent<HTMLInputElement>) {
    setAgeFrom(e.currentTarget.value);
  }

  function handleAgeToChange(e: React.FormEvent<HTMLInputElement>) {
    setAgeTo(e.currentTarget.value);
  }

  function handleNameChange(e: React.FormEvent<HTMLInputElement>) {
    setName(e.currentTarget.value);
  }

  function handleIncomeChange(e: React.FormEvent<HTMLInputElement>) {
    setIncome(e.currentTarget.value);
  }

  function handleGenderChange(e: React.FormEvent<HTMLInputElement>) {
    setGender(e.currentTarget.value);
  }

  function handleIterationsChange(e: React.FormEvent<HTMLInputElement>) {
    setIterations(e.currentTarget.value);
  }

  function handleNumberDotsChange(e: React.FormEvent<HTMLInputElement>) {
    setNumberDots(e.currentTarget.value);
  }

  function handleUploadClick() {
    const API_URL = process.env.REACT_APP_API_URL;
    const data = { age_from, age_to, name, income, gender, iterations, numberDots};

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
        <input className={styles.input} type="text" value={iterations} onChange={handleIterationsChange} />
      </div>
      <div className={styles.info}>
        <div className={styles.description}>Количество щитов</div>
        <input className={styles.input} type="text" value={numberDots} onChange={handleNumberDotsChange} />
      </div>
      <div className={styles.info}>
        <span className={styles.description}>Доход</span>
        <input className={styles.input} type="text" value={income} onChange={handleIncomeChange} />
      </div>
      <div className={styles.info}>
        <span className={styles.description}>Возраст</span>
        <span className={styles.description}>от</span>
        <input className={styles.input} type="text" value={age_from} onChange={handleAgeFromChange} />
        <span className={styles.description}>до</span>
        <input className={styles.input} type="text" value={age_to} onChange={handleAgeToChange} />
      </div>
      <div className={styles.info}>
        <span className={styles.description}>Имя</span>
        <input className={styles.input} type="text" value={name} onChange={handleNameChange} />
      </div>
      <div className={styles.info}>
        <span className={styles.description}>Пол</span>
        <input className={styles.input} type="text" value={gender} onChange={handleGenderChange} />
      </div>
      <button className={styles.button} onClick={handleUploadClick}>
        Показать щиты
      </button>
    </div>
  );
}
