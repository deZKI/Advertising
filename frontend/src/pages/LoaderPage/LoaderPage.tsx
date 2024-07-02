import React from 'react';
import styles from './loaderpage.module.css';
import LoaderGif from '../../assets/images/loader.gif';

export default function LoaderPage() {
  return (
    <div className={styles.container}>
      <img className={styles.loader} src={LoaderGif} alt="Загрузка..." />
    </div>
  )
}
