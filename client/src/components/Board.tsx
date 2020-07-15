import React, { useEffect, useState } from 'react';
import isEven from 'helpers/isEven';
import Spot from 'components/Spot';
import { ReactComponent as BishopImage } from 'images/bishop.svg';
import { ReactComponent as RookImage } from 'images/rook.svg';
import { ReactComponent as KnightImage } from 'images/knight.svg';
import { ReactComponent as QueenImage } from 'images/queen.svg';

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
      },
    ],
    killPosition: '',
    castling: false,
    endPawn: false,
  });

  function setEndPawn(boolean: boolean) {
    setState((prev) => ({
      ...prev,
      endPawn: boolean,
    }));
  }

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

  const setKillPosition = (tileInfo: Position, specialMove: boolean) => {
    if (state.tileFocus !== tileInfo.tile) {
      setState((prev) => ({ ...prev, killPosition: state.tileFocus }));
    }
    // castling case or pawn upgraded
    if (specialMove) {
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
            endPawn={state.endPawn}
            setEndPawn={setEndPawn}
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
    state.endPawn,
  ]);

  // have a state that checks the color of the pawn
  // have state that triggers when pawn is on the end square

  // in spot I have to create a state that triggers when pawn is on end square, setState must await for user click after, state is responsible for letting
  // board div promotion know what colour the piece should be

  // how tf do I make it appear over a specific square

  //create overlay on board that kind of forces user to click on the desired piece

  // create state for endPawn and set it, send it down to spot
  return (
    <div className='viewport'>
      <div className='board'>{state.board}</div>
      <div className='promotion'>
        <span className='promotion squareP beige'>
          <QueenImage
            className='piece white'
            onClick={(e) => {
              // send info to spawn piece
            }}
          />
        </span>
        <span className='promotion squareP brown'>
          <KnightImage
            className='piece white'
            onClick={(e) => {
              // send info to spawn piece
            }}
          />
        </span>
        <span className='promotion squareP beige'>
          <RookImage
            className='piece white'
            onClick={(e) => {
              // send info to spawn piece
            }}
          />
        </span>
        <span className='promotion squareP brown'>
          <BishopImage
            className='piece white'
            onClick={(e) => {
              // send info to spawn piece
            }}
          />
        </span>
      </div>
    </div>
  );
}
