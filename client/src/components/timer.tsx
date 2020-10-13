import React, { useState, useEffect } from 'react';

interface Props {
  turn: number;
  colour: string;
  setIsGameOver: Function;
  setTypeOfWin: Function;
}

export default function Timer(props: Props) {
  const { turn, colour, setIsGameOver, setTypeOfWin } = props;
  const [state, setState] = useState({
    minutes: 10,
    seconds: 0,
    condition: '',
  });

  const { seconds, minutes } = state;

  useEffect(() => {
    const interval = setInterval(() => {
      if (turn === 0) {
        if (colour === 'white') {
          if (seconds > 0) {
            setState((prev) => ({
              ...prev,
              seconds: seconds - 1,
            }));
          }
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval);
              setIsGameOver(true);
              setTypeOfWin('timeout white');
            } else {
              setState((prev) => ({
                ...prev,
                minutes: minutes - 1,
                seconds: 59,
              }));
            }
          }
        }
        if (colour === 'black') {
          clearInterval(interval);
        }
      } else if (turn === 1) {
        if (colour === 'black') {
          if (seconds > 0) {
            setState((prev) => ({
              ...prev,
              seconds: seconds - 1,
            }));
          }
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval);
              setIsGameOver(true);
              setTypeOfWin('timeout black');
            } else {
              setState((prev) => ({
                ...prev,
                minutes: minutes - 1,
                seconds: 59,
              }));
            }
          }
        }
        if (colour === 'white') {
          clearInterval(interval);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [minutes, seconds, turn, colour]);

  return (
    <div
      className={`timer ${colour} ${
        (colour === 'white' && !turn) || (colour === 'black' && turn) ? 'focus' : ''
      }`}
    >
      {minutes === 0 && seconds === 0 ? (
        `${colour} : Time is Out!`
      ) : (
        <div>
          {colour} : {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      )}
    </div>
  );
}
