import React, { useState, useEffect, useLayoutEffect } from 'react';
import Pawn from 'components/pieces/Pawn';
import Rook from 'components/pieces/Rook';
import Knight from 'components/pieces/Knight';
import Bishop from 'components/pieces/Bishop';
import Queen from 'components/pieces/Queen';
import King from 'components/pieces/King';

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

interface StartPosition extends Position {
  activePiece: {
    pieceType: string;
    color: string;
  };
}

interface Props {
  color: string;
  tile: string;
  x: number;
  y: number;
  setDestination: Function;
  destination: StartPosition;
  setStartPosition: Function;
  startPosition: StartPosition;
  tileFocus: string;
  setTileFocus: Function;
  availableMoves: {
    x: number;
    y: number;
  }[];
  setAvailableMoves: Function;
  killPosition: string;
  setKillPosition: Function;
  legalMoves: {
    x: number;
    y: number;
  }[];
  setLegalMoves: Function;
}
const brown = '#8a604a';
const beige = '#e5d3ba';

export default function Spot(props: Props) {
  const {
    tile,
    x,
    y,
    destination,
    setDestination,
    setStartPosition,
    startPosition,
    tileFocus,
    setTileFocus,
    availableMoves,
    setAvailableMoves,
    killPosition,
    setKillPosition,
    legalMoves,
    setLegalMoves,
  } = props;

  const [state, setState] = useState({
    activePiece: {
      pieceType: '',
      color: '',
    },
    tileInfo: {
      tile: '',
      x: 0,
      y: 0,
    },
    isOccupied: false,
    destination: destination,
    isCircleVisible: false,
  });

  let labelColor = '';
  switch (props.color) {
    case 'brown':
      labelColor = beige;
      break;
    case 'beige':
      labelColor = brown;
  }

  useLayoutEffect(() => {
    if (state.tileInfo.tile === killPosition) {
      setState((prev) => ({
        ...prev,
        activePiece: { color: '', pieceType: '' },
        isOccupied: false,
        isCircleVisible: false,
      }));
    }
  }, [killPosition, state.tileInfo.tile]);

  useEffect(() => {
    setState((prev) => ({ ...prev, tileInfo: { tile, x, y } }));
    if (tile.includes('2')) {
      setState((prev) => ({ ...prev, activePiece: { pieceType: 'pawn', color: 'white' }, isOccupied: true }));
    } else if (tile.includes('7')) {
      setState((prev) => ({ ...prev, activePiece: { pieceType: 'pawn', color: 'black' }, isOccupied: true }));
    }
    // Rook START
    else if (tile.includes('a8') || tile.includes('h8')) {
      setState((prev) => ({ ...prev, activePiece: { pieceType: 'rook', color: 'black' }, isOccupied: true }));
    } else if (tile.includes('a1') || tile.includes('h1')) {
      setState((prev) => ({ ...prev, activePiece: { pieceType: 'rook', color: 'white' }, isOccupied: true }));
    }
    // Rook END

    // Knight START
    else if (tile.includes('b8') || tile.includes('g8')) {
      setState((prev) => ({ ...prev, activePiece: { pieceType: 'knight', color: 'black' }, isOccupied: true }));
    } else if (tile.includes('b1') || tile.includes('g1')) {
      setState((prev) => ({ ...prev, activePiece: { pieceType: 'knight', color: 'white' }, isOccupied: true }));
    }
    // Knight END

    // Bishop START
    else if (tile.includes('c8') || tile.includes('f8')) {
      setState((prev) => ({ ...prev, activePiece: { pieceType: 'bishop', color: 'black' }, isOccupied: true }));
    } else if (tile.includes('c1') || tile.includes('f1')) {
      setState((prev) => ({ ...prev, activePiece: { pieceType: 'bishop', color: 'white' }, isOccupied: true }));
    }
    // Bishop END

    // Queen START
    else if (tile.includes('d8')) {
      setState((prev) => ({ ...prev, activePiece: { pieceType: 'queen', color: 'black' }, isOccupied: true }));
    } else if (tile.includes('d1')) {
      setState((prev) => ({ ...prev, activePiece: { pieceType: 'queen', color: 'white' }, isOccupied: true }));
    }
    // Queen END

    // King START
    else if (tile.includes('e8')) {
      setState((prev) => ({ ...prev, activePiece: { pieceType: 'king', color: 'black' }, isOccupied: true }));
    } else if (tile.includes('e1')) {
      setState((prev) => ({ ...prev, activePiece: { pieceType: 'king', color: 'white' }, isOccupied: true }));
    }
  }, [tile, x, y]);

  // NEW CODE HERE
  useEffect(() => {
    //console.log('available moves is', availableMoves);
    let unoccupiedMoves = availableMoves.filter(
      (move) => state.isOccupied === false && JSON.stringify(move) === JSON.stringify(getTileXY(state.tileInfo)),
    );

    if (unoccupiedMoves.length) {
      console.log('filtered list is', unoccupiedMoves);
      setLegalMoves(unoccupiedMoves);
    }
  }, [availableMoves, state.isOccupied]);

  useEffect(() => {
    displayCircle();
  }, [legalMoves]);

  const getTileXY = (tileInfo: Position) => {
    return {
      x: tileInfo.x,
      y: tileInfo.y,
    };
  };

  const displayCircle = () => {
    if (JSON.stringify(legalMoves).includes(JSON.stringify(getTileXY(state.tileInfo)))) {
      setState((prev) => ({ ...prev, isCircleVisible: true }));
    }
    setState((prev) => ({ ...prev, isCircleVisible: false }));
  };

  return (
    <div
      className={`square ${props.color} ${props.tileFocus === state.tileInfo.tile ? 'focus' : ''}`}
      onClick={() => {
        if (startPosition.tile) {
          setDestination(state.tileInfo);
          if (!destination.isFriendly) {
            for (let availableCounter = 0; availableCounter < availableMoves.length; availableCounter++) {
              if (
                state.activePiece.color !== startPosition.activePiece.color &&
                state.tileInfo.x === availableMoves[availableCounter].x &&
                state.tileInfo.y === availableMoves[availableCounter].y
              ) {
                setKillPosition(state.tileInfo);
                setState({
                  ...state,
                  activePiece: {
                    pieceType: startPosition.activePiece.pieceType,
                    color: startPosition.activePiece.color,
                  },
                  isOccupied: true,
                });
              }
            }
          }

          setTileFocus();
          setAvailableMoves([]);
          setStartPosition({ x: 0, y: 0 }, '', '');
        }
      }}
    >
      {/* Pawn START */}
      {state.activePiece.pieceType === 'pawn' && state.activePiece.color === 'black' && (
        <Pawn
          tileInfo={state.tileInfo}
          white={false}
          isOccupied={state.isOccupied}
          setStartPosition={setStartPosition}
          setAvailableMoves={setAvailableMoves}
          setTileFocus={setTileFocus}
        />
      )}

      {state.activePiece.pieceType === 'pawn' && state.activePiece.color === 'white' && (
        <Pawn
          tileInfo={state.tileInfo}
          white={true}
          isOccupied={state.isOccupied}
          setStartPosition={setStartPosition}
          setAvailableMoves={setAvailableMoves}
          setTileFocus={setTileFocus}
        />
      )}

      {/* Pawn END */}

      {/* Rook START*/}
      {state.activePiece.pieceType === 'rook' && state.activePiece.color === 'black' && (
        <Rook
          tileInfo={state.tileInfo}
          white={false}
          isOccupied={state.isOccupied}
          setStartPosition={setStartPosition}
          setAvailableMoves={setAvailableMoves}
          setTileFocus={setTileFocus}
        />
      )}
      {state.activePiece.pieceType === 'rook' && state.activePiece.color === 'white' && (
        <Rook
          tileInfo={state.tileInfo}
          white={true}
          isOccupied={state.isOccupied}
          setStartPosition={setStartPosition}
          setAvailableMoves={setAvailableMoves}
          setTileFocus={setTileFocus}
        />
      )}
      {/* Rook END */}

      {/* Knight START */}
      {state.activePiece.pieceType === 'knight' && state.activePiece.color === 'black' && (
        <Knight
          tileInfo={state.tileInfo}
          white={false}
          isOccupied={state.isOccupied}
          setStartPosition={setStartPosition}
          setAvailableMoves={setAvailableMoves}
          setTileFocus={setTileFocus}
        />
      )}
      {state.activePiece.pieceType === 'knight' && state.activePiece.color === 'white' && (
        <Knight
          tileInfo={state.tileInfo}
          white={true}
          isOccupied={state.isOccupied}
          setStartPosition={setStartPosition}
          setAvailableMoves={setAvailableMoves}
          setTileFocus={setTileFocus}
        />
      )}
      {/* Knight END */}

      {/* Bishop START */}
      {state.activePiece.pieceType === 'bishop' && state.activePiece.color === 'black' && (
        <Bishop
          tileInfo={state.tileInfo}
          white={false}
          isOccupied={state.isOccupied}
          setStartPosition={setStartPosition}
          setAvailableMoves={setAvailableMoves}
          setTileFocus={setTileFocus}
        />
      )}
      {state.activePiece.pieceType === 'bishop' && state.activePiece.color === 'white' && (
        <Bishop
          tileInfo={state.tileInfo}
          white={true}
          isOccupied={state.isOccupied}
          setStartPosition={setStartPosition}
          setAvailableMoves={setAvailableMoves}
          setTileFocus={setTileFocus}
        />
      )}
      {/* Bishop END */}

      {/* Queen START */}
      {state.activePiece.pieceType === 'queen' && state.activePiece.color === 'black' && (
        <Queen
          tileInfo={state.tileInfo}
          white={false}
          isOccupied={state.isOccupied}
          setStartPosition={setStartPosition}
          setAvailableMoves={setAvailableMoves}
          setTileFocus={setTileFocus}
        />
      )}
      {state.activePiece.pieceType === 'queen' && state.activePiece.color === 'white' && (
        <Queen
          tileInfo={state.tileInfo}
          white={true}
          isOccupied={state.isOccupied}
          setStartPosition={setStartPosition}
          setAvailableMoves={setAvailableMoves}
          setTileFocus={setTileFocus}
        />
      )}
      {/* Queen END */}

      {/* King START */}
      {state.activePiece.pieceType === 'king' && state.activePiece.color === 'black' && (
        <King
          tileInfo={state.tileInfo}
          white={false}
          isOccupied={state.isOccupied}
          setStartPosition={setStartPosition}
          setAvailableMoves={setAvailableMoves}
          setTileFocus={setTileFocus}
        />
      )}
      {state.activePiece.pieceType === 'king' && state.activePiece.color === 'white' && (
        <King
          tileInfo={state.tileInfo}
          white={true}
          isOccupied={state.isOccupied}
          setStartPosition={setStartPosition}
          setAvailableMoves={setAvailableMoves}
          setTileFocus={setTileFocus}
        />
      )}
      {/* King END */}

      <span className='square-position' style={{ color: labelColor }}>
        {props.tile}
      </span>
      <span
        className='available-moves-circle'
        style={state.isCircleVisible ? { display: 'block' } : { display: 'none' }}
      ></span>
    </div>
  );
}
