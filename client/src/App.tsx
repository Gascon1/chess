import React, { useState, useEffect } from 'react';
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

  return (
    <SpotsContext.Provider value={spots}>
      <Board
        turn={state.turn}
        activePlayer={state.activePlayer}
        isRoundOver={state.isRoundOver}
        isGameOver={state.isGameOver}
      />
    </SpotsContext.Provider>
  );
}

export default App;
