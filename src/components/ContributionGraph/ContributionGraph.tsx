import { useEffect, useState } from 'react'
import styles from './ContributionGraph.module.css'
import Day from '../Day/Day'

type TserverData = {
    [date: string]: number
}

export type Tday = {
    date: Date,
    count: number,
}

const ContributionGraph = () => {

    const [serverData, setServerData] = useState<TserverData | null>(null)

    const currentDate = new Date

    useEffect(() => {
        fetch('https://dpg.gg/test/calendar.json', {
            method: 'GET',
        }
        )
            .then((data) => {
                if (data.ok) {
                    return data.json()
                }
                else {
                    Promise.reject('response is not ok')
                }
            })
            .then((data: TserverData) => {
                setServerData(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const days: Array<Tday> = [];

    for (let i = 0; i < 357; i++) {
        const prewDate: Date = new Date();
        prewDate.setDate(currentDate.getDate() - i);
        days[i] = {
            date: prewDate,
            count: 0,
        }
        // currentDate = prewDate;
    }

    function addDays() {
        const dayOfWeek = currentDate.getDay();

        let elementsToAdd: number = 0;
        if (dayOfWeek === 1) { // понедельник
            elementsToAdd = 6;
        } else if (dayOfWeek === 2) { // вторник
            elementsToAdd = 5;
        } else if (dayOfWeek === 3) { //среда
            elementsToAdd = 4;
        }
        else if (dayOfWeek === 4) { //четверг
            elementsToAdd = 3;
        }
        else if (dayOfWeek === 5) { //пятница
            elementsToAdd = 2;
        }
        else if (dayOfWeek === 6) { //суббота
            elementsToAdd = 1;
        }
        else if (dayOfWeek === 7) { //суббота
            elementsToAdd = 0;
        }

        if (elementsToAdd > 0) {
            for (let i = 0; i < elementsToAdd; i++) {
                const newDate: Date = new Date();
                newDate.setDate(currentDate.getDate() + i + 1);
                days.unshift({ date: newDate, count: 0 });
                days.pop();
            }
        }
    }

    addDays()//add days for full week

    function addCountersFromServer() {
        days.forEach((element) => {
            const dateString = element.date.toISOString().split('T')[0];
            if (serverData?.hasOwnProperty(dateString)) {
                element.count = serverData[dateString];
            }
        });
    }

    addCountersFromServer()

    function getMonths(monthNumber: number) {
        const allMonths = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        return [...allMonths.slice(monthNumber + 1), ...allMonths.slice(0, monthNumber + 1)];
    }

    const months = getMonths(currentDate.getMonth())

    return (
        <section className={styles.section}>
            <ul className={styles.week_list}>
                <li><span className={styles.week}>Пн</span></li>
                <li><span className={styles.week}>Ср</span></li>
                <li><span className={styles.week}>Пт</span></li>
            </ul>
            <div className={styles.column_helper}>
                <ul className={styles.month_list}>
                    {months.map((el, index) => {
                        return (<div className={styles.month} key={index}>{el}</div>)
                    })}
                </ul>
                <ul className={styles.graph}>
                    {days.reverse().map((el, index) => {
                        return (<Day key={index} date={el.date} count={el.count} />)
                    }
                    )}
                </ul>
            </div>
        </section>
    )
}

export default ContributionGraph