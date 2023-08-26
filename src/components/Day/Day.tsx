import { FC } from 'react'
import styles from './Day.module.css'
import { Tday } from '../ContributionGraph/ContributionGraph'

const Day: FC<Tday> = ({ date, count }) => {

    function getStringDay(dayOfWeek: Date) {
        const daysOfWeek = ['Восерксенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return daysOfWeek[dayOfWeek.getDay()];
    }

    function getStringMonth(dayOfWeek: Date) {
        const daysOfWeek = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        return daysOfWeek[dayOfWeek.getMonth()];
    }

    const stingDay = getStringDay(date)

    const stringMonth = getStringMonth(date)

    date.toString()
    return (
        <li className={styles.main_container}>
            <div className={styles.hidden_field}>
                <span>{count===0? 'No': count} contributions</span>
                <span className={styles.text}
                >{stingDay}, {stringMonth} {date.getDate()}, {date.getFullYear()}</span>
            </div>
            <div className={`${styles.container} 
            ${(count > 1 && count < 10) ? styles.low_modifier : ''}
            ${(count >= 10 && count <= 19) ? styles.mid_modifier : ''}
            ${(count >= 20 && count <= 29) ? styles.super_modifier : ''}
            ${(count >= 30) ? styles.extra_modifier : ''}
            `}></div>
        </li>
    )
}

export default Day