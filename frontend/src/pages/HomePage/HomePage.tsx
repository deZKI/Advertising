import React from 'react';
import styles from './homepage.module.css';
import {MapContainer, TileLayer} from 'react-leaflet'
import LogoImage from '../../assets/images/adspotter_logo.png'
import Panel from '../../ui/Panel/Panel';

export default function HomePage() {
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
        <MapContainer className={styles.leaflet} center={[55.7522, 37.3656]} zoom={11}>
          <TileLayer 
            className={styles.leaflet__tiles}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          />
        </MapContainer>
      </main>
    </>
  );
}
