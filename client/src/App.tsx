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
    check: { colour: '', flag: false },
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

  function setCheck(colour: string, flag: boolean) {
    setState((prev) => ({
      ...prev,
      check: {
        colour,
        flag,
      },
    }));
  }

  return (
    <SpotsContext.Provider value={spots}>
      <Board
        turn={state.turn}
        activePlayer={state.activePlayer}
        isRoundOver={state.isRoundOver}
        isGameOver={state.isGameOver}
        setTurn={setTurn}
        check={state.check}
        setCheck={setCheck}
        setActivePlayer={setActivePlayer}
      />
    </SpotsContext.Provider>
  );
}

export default App;
