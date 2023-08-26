import { FC } from 'react'
import styles from './Day.module.css'
import { Tday } from '../ContributionGraph/ContributionGraph'

const Day: FC<Tday> = ({ date, count }) => {

    return (
        <div className={styles.container}>{date.toString()}</div>
    )
}

export default Day