import React, { useState } from 'react';
import Board from 'components/Board';
import { SpotsContext } from 'context/SpotsContext';
import { useSpots } from 'hooks/useSpots';

function App() {
  const spots = useSpots();

  const [state, setState] = useState({
    player1Name: '',
    player2Name: '',
    turn: 0,
    activePlayer: 'white',
    isGameOver: false,
    typeOfGameEnd: 'win',
    typeOfWin: 'checkmate',
  });

  function setTurn(value: number) {
    setState((prev) => ({
      ...prev,
      turn: value,
    }));
  }
  function setActivePlayer(colour: string) {
    setState((prev) => ({
      ...prev,
      activePlayer: colour,
    }));
  }

  function setIsGameOver(flag: boolean) {
    setState((prev) => ({
      ...prev,
      isGameOver: flag,
    }));
  }

  function setTypeOfWin(condition: string) {
    setState((prev) => ({
      ...prev,
      tpyeOfWin: condition,
    }));
  }

  return (
    <SpotsContext.Provider value={spots}>
      <Board
        turn={state.turn}
        activePlayer={state.activePlayer}
        isGameOver={state.isGameOver}
        setTurn={setTurn}
        setActivePlayer={setActivePlayer}
        setIsGameOver={setIsGameOver}
        setTypeOfWin={setTypeOfWin}
      />
    </SpotsContext.Provider>
  );
}

export default App;
