import { HiArrowDownCircle, HiArrowUpCircle } from 'react-icons/hi2'

export function Length(props) {
    const { title, changeTime, type, time, formatTime } = props;
    return (
        <div>
            <h3>{title}</h3>
            <div className="time-sets">
                <button onClick={() => changeTime(60, type)} ><HiArrowUpCircle size='1.5rem' /></button>
                <h3>{formatTime(time)}</h3>
                <button onClick={() => changeTime(-60, type)}><HiArrowDownCircle size='1.5rem' /></button>
            </div>
        </div>
    )
}
