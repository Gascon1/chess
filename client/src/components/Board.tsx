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
        piece: '',
      },
    ],
    killPosition: '',
    castling: false,
  });

  function setCastling(boolean: boolean) {
    setState((prev) => ({
      ...prev,
      castling: boolean,
    }));
  }

  function setDestination(tileInfo: Position, pieceType: string, color: string) {
    setState((prev) => ({
      ...prev,
      destination: { activePiece: { pieceType, color }, ...tileInfo },
    }));
    // if (state.tileFocus !== tileInfo.tile) {
    //   setState((prev) => ({ ...prev, killPosition: state.tileFocus }));
    // }
  }

  const setKillPosition = (tileInfo: Position, castling: boolean) => {
    if (state.tileFocus !== tileInfo.tile) {
      setState((prev) => ({ ...prev, killPosition: state.tileFocus }));
    }
    // castling case
    if (castling) {
      setState((prev) => ({ ...prev, killPosition: tileInfo.tile }));
    }
  };

  function setStartPosition(tileInfo: Position, pieceType: string, color: string) {
    setState((prev) => ({
      ...prev,
      startPosition: { activePiece: { pieceType, color }, ...tileInfo },
      // destination: {
      //   activePiece: {
      //     pieceType: '',
      //     color: '',
      //   },
      //   tile: '',
      //   x: 0,
      //   y: 0,
      // },
    }));
  }

  const setTileFocus = (tilePosition: string) => {
    setState((prev) => ({ ...prev, tileFocus: tilePosition }));
  };

  const setAvailableMoves = (availableMoves: any) => {
    setState((prev) => ({ ...prev, availableMoves }));
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
            castling={state.castling}
            setCastling={setCastling}
          />,
        );
      });
    }
    setState((prev) => ({ ...prev, board }));
  }, [
    state.destination,
    state.startPosition,
    state.availableMoves,
    state.killPosition,
    state.tileFocus,
    state.castling,
  ]);

  return <div className='board'>{state.board}</div>;
}
