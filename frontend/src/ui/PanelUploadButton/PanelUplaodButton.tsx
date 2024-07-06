import React from 'react';
import styles from './paneluploadbutton.module.css';
import {generateRandomString} from '../../utils/generateRandomString';
import {generateRandomPoints} from '../../utils/generateRandomPoints';
import {generateRandomType} from '../../utils/generateRandomType';
import {setCSVData} from '../../store/csvData/csvDataActions';
import {TCSVData} from '../../types/csvData.type';
import {useDispatch} from 'react-redux';

const createCSVRandomData = (): TCSVData => {
  const randomType = generateRandomType(); 

  return {
    id: generateRandomString(), 
    points: Array.from(Array(200).keys()).map(() => {
      const { id, lat, lon, azimuth } = generateRandomPoints();
      return { id, lat, lon, azimuth }
    }),
    prediction: 26.12,
    ageFrom: 30,
    ageTo: 100,
    income: "",
    name: "0",
    gender: "male",
    description: "Perfect result!",
    type: randomType,
  }
}

export default function PanelUplaodButton() {
  const csvData = createCSVRandomData();
  const dispatch = useDispatch();

  const handleUploadClick = () => dispatch(setCSVData(csvData));

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleUploadClick}>
        Выберите файл
      </button>
    </div>
  )
}
