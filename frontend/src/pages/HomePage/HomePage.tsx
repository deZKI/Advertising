import React from 'react';
import styles from './homepage.module.css';
import {generateRandomCoordinates} from '../../utils/generateRandomCoordinates';
import {generateRandomString} from '../../utils/generateRandomString';
import {generateRandomType} from '../../utils/generateRandomType';
import LogoImage from '../../assets/images/adspotter_logo.png';
import Panel from '../../ui/Panel/Panel';
import Map from '../../ui/Map/Map';

export default function HomePage() {
  const generateRandomBanners = () => Array.from(Array(1000).keys()).map(() => {
    return {
      id: generateRandomString(),
      type: generateRandomType(),
      coordinate: generateRandomCoordinates()
    }
  })
  const bannersList = generateRandomBanners();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <a className={styles.link} href="/">
            <img className={styles.image} src={LogoImage} alt="логотип" />
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <Panel />
        <Map list={bannersList} />
      </main>
    </>
  );
}
