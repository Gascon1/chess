import React, { useState } from 'react';
import Board from 'components/Board';
import { SpotsContext } from 'context/SpotsContext';
import { useSpots } from 'hooks/useSpots';
import Position from 'components/interfaces/position';

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

    promotion: {
      pieceType: '',
      color: '',
    },
    deletePawn: {
      tile: '',
      x: 0,
      y: 0,
    },
    endPawn: { color: '', flag: false },
    startPosition: {
      activePiece: {
        pieceType: '',
        color: '',
      },
      tile: '',
      x: 0,
      y: 0,
    },
    destination: {
      activePiece: {
        pieceType: '',
        color: '',
      },
      tile: '',
      x: 0,
      y: 0,
    },
    tileFocus: '',
    availableMoves: [
      {
        x: 0,
        y: 0,
      },
    ],
    check: '',
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

  function setPromotion(promotion: any) {
    setState((prev) => ({
      ...prev,
      promotion: promotion,
    }));
  }

  function setDeletePawn(deletePawn: Position) {
    setState((prev) => ({
      ...prev,
      deletePawn,
    }));
  }

  function setEndPawn(color: string, flag: boolean) {
    setState((prev) => ({
      ...prev,
      endPawn: { flag, color },
    }));
  }

  const setAvailableMoves = (availableMoves: any) => {
    setState((prev) => ({ ...prev, availableMoves }));
  };

  function setDestination(tileInfo: Position, pieceType: string, color: string) {
    setState((prev) => ({
      ...prev,
      destination: { activePiece: { pieceType, color }, ...tileInfo },
    }));
  }

  function setStartPosition(tileInfo: Position, pieceType: string, color: string) {
    setState((prev) => ({
      ...prev,
      startPosition: { activePiece: { pieceType, color }, ...tileInfo },
    }));
  }

  const setTileFocus = (tilePosition: string) => {
    setState((prev) => ({ ...prev, tileFocus: tilePosition }));
  };

  return (
    <SpotsContext.Provider value={spots}>
      <Board
        turn={state.turn}
        activePlayer={state.activePlayer}
        setTurn={setTurn}
        setActivePlayer={setActivePlayer}
        promotion={state.promotion}
        setPromotion={setPromotion}
        deletePawn={state.deletePawn}
        setDeletePawn={setDeletePawn}
        endPawn={state.endPawn}
        setEndPawn={setEndPawn}
        // castling={state.castling}
        // setCastling={setCastling}
        destination={state.destination}
        setDestination={setDestination}
        startPosition={state.startPosition}
        setStartPosition={setStartPosition}
        tileFocus={state.tileFocus}
        setTileFocus={setTileFocus}
        availableMoves={state.availableMoves}
        setAvailableMoves={setAvailableMoves}
      />
    </SpotsContext.Provider>
  );
}

export default App;
