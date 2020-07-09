import React, { useEffect, useState } from 'react';
import isEven from 'helpers/isEven';
import Spot from 'components/Spot';

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

export default function Board() {
  // Todo: integrate pieces into each square created in board;
  const [state, setState] = useState({
    board: [],
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
    occupiedChecker: [
      {
        x: 0,
        y: 0,
      },
    ],
    killPosition: '',
    legalMoves: [
      {
        x: 0,
        y: 0,
      },
    ],
  });

  function setDestination(tileInfo: Position, pieceType: string, color: string) {
    setState((prev) => ({ ...prev, destination: { activePiece: { pieceType, color }, ...tileInfo } }));
    // if (state.tileFocus !== tileInfo.tile) {
    //   setState((prev) => ({ ...prev, killPosition: state.tileFocus }));
    // }
  }

  const setKillPosition = (tileInfo: Position) => {
    if (state.tileFocus !== tileInfo.tile) {
      setState((prev) => ({ ...prev, killPosition: state.tileFocus }));
    }
  };

  function setStartPosition(tileInfo: Position, pieceType: string, color: string) {
    setState((prev) => ({
      ...prev,
      startPosition: { activePiece: { pieceType, color }, ...tileInfo },
      destination: {
        activePiece: {
          pieceType: '',
          color: '',
        },
        tile: '',
        x: 0,
        y: 0,
      },
    }));
  }

  const setTileFocus = (tilePosition: string) => {
    setState((prev) => ({ ...prev, tileFocus: tilePosition }));
  };

  const setAvailableMoves = (availableMoves: any) => {
    setState((prev) => ({ ...prev, availableMoves, legalMoves: [] }));
  };

  const setOccupiedChecker = (occupiedChecker: any) => {
    setState((prev) => ({ ...prev, occupiedChecker }));
  };

  const setLegalMoves = (legalMoves: any) => {
    setState((prev) => ({ ...prev, legalMoves: [...prev.legalMoves, ...legalMoves] }));
  };

  useEffect(() => {
    let board: any = [];
    const alphaPosition = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const numericPosition = 0;
    for (let j = 8; j > numericPosition; j--) {
      alphaPosition.forEach((value, i) => {
        let spotColor;
        if ((isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))) {
          spotColor = 'beige';
        } else {
          spotColor = 'brown';
        }

        board.push(
          <Spot
            key={value + j}
            color={spotColor}
            tile={value + j}
            x={i + 1}
            y={j}
            setDestination={setDestination}
            destination={state.destination}
            setStartPosition={setStartPosition}
            startPosition={state.startPosition}
            tileFocus={state.tileFocus}
            setTileFocus={setTileFocus}
            availableMoves={state.availableMoves}
            setAvailableMoves={setAvailableMoves}
            killPosition={state.killPosition}
            setKillPosition={setKillPosition}
            legalMoves={state.legalMoves}
            setLegalMoves={setLegalMoves}
            occupiedChecker={state.occupiedChecker}
            setOccupiedChecker={setOccupiedChecker}
          />,
        );
      });
    }
    setState((prev) => ({ ...prev, board }));
  }, [
    state.destination,
    state.startPosition,
    state.legalMoves,
    state.availableMoves,
    state.killPosition,
    state.tileFocus,
    state.occupiedChecker,
  ]);

  return <div className='board'>{state.board}</div>;
}
