import React, { useState, useEffect } from 'react';

interface Props {
  turn: number;
}

export default function Timer(props: Props) {
  const { turn } = props;
  const [state, setState] = useState({
    minutes: 10,
    seconds: 0,
    condition: '',
  });

  const { seconds, minutes } = state;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!turn) {
        if (seconds > 0) {
          setState((prev) => ({
            ...prev,
            seconds: seconds - 1,
          }));
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setState((prev) => ({
              ...prev,
              minutes: minutes - 1,
              seconds: 59,
            }));
          }
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [state, minutes, seconds, turn]);

  return (
    <div className='timer'>
      {minutes === 0 && seconds === 0 ? (
        `Time is Out!`
      ) : (
        <div>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      )}
    </div>
  );
}
