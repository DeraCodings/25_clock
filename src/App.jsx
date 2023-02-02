import { useState } from 'react'
import './App.css'
import { Length } from './components/Length';
import {HiPlay, HiPause, HiOutlineArrowPath} from 'react-icons/hi2'

function App() {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [isTimeOn, setIsTimeOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakAudio, setBreakAudio] = useState(new Audio('./assets/alarm.wav'));

  function playAudio() {
    breakAudio.currentTime = 0;
    breakAudio.play();
  }

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    return (
      (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
    );
  }

  const changeTime = (amount, type) => {
    if (type == 'break') {
      if (breakTime <= 60 && amount < 0) return;
      setBreakTime(prev => prev + amount);
    }
    else {
      if (sessionTime <= 60 && amount < 0) return;
      setSessionTime(prev => prev + amount);
      if (!isTimeOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  }

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let newDate = new Date().getTime() + second;
    let onBreakVar = onBreak;
    if (!isTimeOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > newDate) {
          setDisplayTime(prev => {
            if (prev <= 0 && !onBreakVar) {
              playAudio();
              onBreakVar = true;
              setOnBreak(true);
              return breakTime;
            }
            else if (prev <= 0 && onBreakVar) {
              playAudio();
              onBreakVar = false;
              setOnBreak(false);
              return breakTime;
            }
            return prev - 1;
          });
          newDate += second;
        }
      }, 30)
      localStorage.clear();
      localStorage.setItem('interval-id', interval);
    }

    if (isTimeOn) {
      clearInterval(localStorage.getItem('interval-id'));
    }

    setIsTimeOn(!isTimeOn);
  }
  
  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
  }

  return (
    <div className="App">
      <h1>Pomodoro Clock</h1>
      <Length title='break length' changeTime={changeTime} type='break' time={breakTime} formatTime={formatTime} id='break-label' id2='break-length' inc='break-increment' dec='break-decrement' />
      <Length title='session length' changeTime={changeTime} type='session' time={sessionTime} formatTime={formatTime} id='session-label' id2='session-length' inc='session-increment' dec='session-decrement' />
      <h3 id='time-label'>{ onBreak ? 'Break' : 'Session' }</h3>
      <h2 id='time-left'>{formatTime(displayTime)}</h2>
      <button onClick={() => controlTime()} id='start_stop'>
        {isTimeOn ?
          <HiPause /> : <HiPlay />
        }
      </button>
      <button onClick={() => resetTime()} id='reset'><HiOutlineArrowPath /></button>
    </div>
  )
}

export default App
