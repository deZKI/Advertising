import React, {useState} from 'react';
import styles from './paneluploadbutton.module.css';
import {setCSVData} from '../../store/csvData/csvDataActions';
import {TCSVData} from '../../types/csvData.type';
import Loading from '../Loading/Loading';
import {useDispatch} from 'react-redux';
import axios from 'axios';

export default function PanelUplaodButton() {
  const [laoding, setLoading] = useState(false);
  const dispatch = useDispatch();

  function handleUploadChange(e: any) {
    const API_URL = process.env.REACT_APP_API_URL;
    const file = e.target.files[0];

    setLoading(true);

    axios.post(`${API_URL}/advert`, {'file': file, 'connect_gigachat': false}, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      const csvData: TCSVData = response.data;
      dispatch(setCSVData(csvData));
    })
    .catch((err) => {
      console.error(err);
    });

    setLoading(false);
  }

  return (
    <div className={styles.container}>
      {!laoding
          ? <label className={styles.button} htmlFor="upload-button">
              <input id="upload-button" className={styles.input} type="file" accept=".csv" onChange={handleUploadChange} />
              <span className={styles.desc}>Выберите файл</span>
            </label>
          : <Loading />
      }
    </div>
  )
}
