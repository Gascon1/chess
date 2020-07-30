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
    isRoundOver: false,
    isGameOver: false,
    typeOfGameEnd: 'win',
    typeOfWin: 'checkmate',
  });

  function setTurn(value: number) {
    if (!value) {
      setState((prev) => ({
        ...prev,
        turn: value,
        activePlayer: 'white',
      }));
    } else {
      setState((prev) => ({
        ...prev,
        turn: value,
        activePlayer: 'black',
      }));
    }
  }

  return (
    <SpotsContext.Provider value={spots}>
      <Board
        turn={state.turn}
        activePlayer={state.activePlayer}
        isRoundOver={state.isRoundOver}
        isGameOver={state.isGameOver}
        setTurn={setTurn}
      />
    </SpotsContext.Provider>
  );
}

export default App;
