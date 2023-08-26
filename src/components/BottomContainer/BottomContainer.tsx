import React from 'react'
import styles from './BottomContainer.module.css'

const BottomContainer = () => {
    return (
        <div className={styles.container}>
            <p className={styles.text}>Меньше</p>
            <ul className={styles.list}>
                <li className={`${styles.image} ${styles.image1}`}><div className={styles.hidden_field}>Нет контрибуций</div></li>
                <li className={`${styles.image} ${styles.image2}`}><div className={styles.hidden_field}>1-9 контрибуций</div></li>
                <li className={`${styles.image} ${styles.image3}`}><div className={styles.hidden_field}>10-19 контрибуций</div></li>
                <li className={`${styles.image} ${styles.image4}`}><div className={styles.hidden_field}>20-29 контрибуций</div></li>
                <li className={`${styles.image} ${styles.image5}`}><div className={styles.hidden_field}>30+ контрибуций</div></li>
            </ul>
            <p className={styles.text}>Больше</p>
        </div>
    )
}

export default BottomContainer