import React, { useState } from 'react';
import Board from 'components/Board';
import { SpotsContext } from 'context/SpotsContext';
import { useSpots } from 'hooks/useSpots';
import Timer from 'components/Timer';
import CheckDisplay from 'components/CheckDisplay';

function App() {
  const spots = useSpots();

  const [state, setState] = useState({
    player1Name: '',
    player2Name: '',
    turn: 0,
    activePlayer: 'white',
    isGameOver: false,
    typeOfGameEnd: 'win',
    typeOfWin: '',
    check: '',
  });

  const setTurn = (value: number) => {
    setState((prev) => ({
      ...prev,
      turn: value,
    }));
  };

  const setActivePlayer = (colour: string) => {
    setState((prev) => ({
      ...prev,
      activePlayer: colour,
    }));
  };

  const setIsGameOver = (flag: boolean) => {
    setState((prev) => ({
      ...prev,
      isGameOver: flag,
    }));
  };

  const setTypeOfWin = (condition: string) => {
    setState((prev) => ({
      ...prev,
      typeOfWin: condition,
    }));
  };

  const setCheck = (colour: string) => {
    setState((prev) => ({ ...prev, check: colour }));
  };

  return (
    <SpotsContext.Provider value={spots}>
      <CheckDisplay check={state.check} isGameOver={state.isGameOver} typeOfWin={state.typeOfWin} />
      <div>
        <Board
          turn={state.turn}
          activePlayer={state.activePlayer}
          setTurn={setTurn}
          setActivePlayer={setActivePlayer}
          setIsGameOver={setIsGameOver}
          setTypeOfWin={setTypeOfWin}
          setCheck={setCheck}
        />
        <div className='timer-container'>
          <Timer
            turn={state.turn}
            colour={'white'}
            setIsGameOver={setIsGameOver}
            setTypeOfWin={setTypeOfWin}
          />
          <Timer
            turn={state.turn}
            colour={'black'}
            setIsGameOver={setIsGameOver}
            setTypeOfWin={setTypeOfWin}
          />
        </div>
      </div>
    </SpotsContext.Provider>
  );
}

export default App;
