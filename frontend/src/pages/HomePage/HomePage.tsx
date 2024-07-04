import React, { useEffect, useState } from 'react';
import styles from './homepage.module.css';
import { fetchAdverts } from '../../api/advert';
import {TItem} from '../../types/item.type';
import LogoImage from '../../assets/images/adspotter_logo.png';
import Panel from '../../ui/Panel/Panel';
import Map from '../../ui/Map/Map';

export default function HomePage() {
    const [list, setList] = useState<TItem[]>([]);

    useEffect(() => {
        async function loadItems() {
            try {
                const items = await fetchAdverts();
                console.log(items);
                setList(items);
            } catch (error) {
                console.error('Error loading items:', error);
            }
        }
        loadItems();
    }, []);

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
                <Panel list={list} />
                <Map list={list} />
            </main>
        </>
    );
}
