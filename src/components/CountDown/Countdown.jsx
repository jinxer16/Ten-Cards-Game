import React from 'react';
import Countdown from "react-countdown";
import './Countdown.css';
// Random component
const Completionist = () => <span>You are good to go!</span>;

const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  const getLocalStorageValue = (s) => localStorage.getItem(s);

function Countdowncome() {
    const renderer = ({minutes, seconds }) => {
return (
  <span style={{color:"rgba(49, 167, 237, 1)"}} className='text-main font-semibold Countdown'>
 {minutes}:{seconds}
  </span>
);
};
    return (
        <div>
  <Countdown 
  date={Date.now() + 600000} renderer={renderer} />
        </div>
    )
}

export default Countdowncome
