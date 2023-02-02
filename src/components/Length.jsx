import { HiArrowDownCircle, HiArrowUpCircle } from 'react-icons/hi2'

export function Length(props) {
    const { id, title, changeTime, id2, inc, dec, type, time, formatTime } = props;
    return (
        <div id={id}>
            <h3>{title}</h3>
            <div className="time-sets" id={id2}>
                <button id={inc} onClick={() => changeTime(60, type)} ><HiArrowUpCircle size='1.5rem' /></button>
                <h3>{formatTime(time)}</h3>
                <button id={dec} onClick={() => changeTime(-60, type)}><HiArrowDownCircle size='1.5rem' /></button>
            </div>
        </div>
    )
}
