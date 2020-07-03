import React, { useState, useEffect } from 'react';
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

interface Props {
  color: string;
  tile: string;
  x: number;
  y: number;
  setDestination: Function;
  destination: Position;
  setStartPosition: Function;
  startPosition: Position;
  tileFocus: string;
  setTileFocus: Function;
  availableMoves: {
    x: number;
    y: number;
  }[];
  setAvailableMoves: Function;
}
const brown = '#874626';
const beige = '#e5c59b';

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
  } = props;
  const [state, setState] = useState({
    activePiece: '',
    tileInfo: {
      tile: '',
      x: 0,
      y: 0,
    },
    isOccupied: false,
    destination: destination,
  });

  let labelColor = '';
  switch (props.color) {
    case 'brown':
      labelColor = beige;
      break;
    case 'beige':
      labelColor = brown;
  }

  useEffect(() => {
    setState((prev) => ({ ...prev, tileInfo: { tile, x, y } }));
    if (tile.includes('2')) {
      setState((prev) => ({ ...prev, activePiece: 'pawn', isOccupied: true }));
    } else if (tile.includes('7')) {
      setState((prev) => ({ ...prev, activePiece: 'pawn', isOccupied: true }));
    }
    // Rook START
    else if (tile.includes('a8') || tile.includes('h8')) {
      setState((prev) => ({ ...prev, activePiece: 'rook', isOccupied: true }));
    } else if (tile.includes('a1') || tile.includes('h1')) {
      setState((prev) => ({ ...prev, activePiece: 'rook', isOccupied: true }));
    }
    // Rook END
    // Knight START
    else if (tile.includes('b8') || tile.includes('g8')) {
      setState((prev) => ({ ...prev, activePiece: 'knight', isOccupied: true }));
    } else if (tile.includes('b1') || tile.includes('g1')) {
      setState((prev) => ({ ...prev, activePiece: 'knight', isOccupied: true }));
    }
    // Knight END
    // Bishop START
    else if (tile.includes('c8') || tile.includes('f8')) {
      setState((prev) => ({ ...prev, activePiece: 'bishop', isOccupied: true }));
    } else if (tile.includes('c1') || tile.includes('f1')) {
      setState((prev) => ({ ...prev, activePiece: 'bishop', isOccupied: true }));
    }
    // Bishop END
    // Queen START
    else if (tile.includes('d8')) {
      setState((prev) => ({ ...prev, activePiece: 'queen', isOccupied: true }));
    } else if (tile.includes('d1')) {
      setState((prev) => ({ ...prev, activePiece: 'queen', isOccupied: true }));
    }
    // Queen END
    // King START
    else if (tile.includes('e8')) {
      setState((prev) => ({ ...prev, activePiece: 'king', isOccupied: true }));
    } else if (tile.includes('e1')) {
      setState((prev) => ({ ...prev, activePiece: 'king', isOccupied: true }));
    }
  }, [tile, x, y, destination, availableMoves]);

  const onMoveDestination = (currentPosition: Position, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setDestination(currentPosition);
  };

  const getTileXY = () => {
    return {
      x: state.tileInfo.x,
      y: state.tileInfo.y,
    };
  };

  const displayCircle = () => {
    if (JSON.stringify(availableMoves).includes(JSON.stringify(getTileXY()))) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={`square ${props.color} ${props.tileFocus === state.tileInfo.tile ? 'focus' : ''}`}
      onClick={(e) => {
        onMoveDestination(state.tileInfo, e);
        setTileFocus();
        setAvailableMoves([]);
      }}
    >
      {/* Pawn START */}
      {props.tile.includes('7') && (
        <Pawn
          tileInfo={state.tileInfo}
          white={false}
          isOccupied={state.isOccupied}
          destination={state.destination}
          setStartPosition={setStartPosition}
          setAvailableMoves={setAvailableMoves}
          setTileFocus={setTileFocus}
        />
      )}
      {props.tile.includes('2') && (
        <Pawn
          tileInfo={state.tileInfo}
          white={true}
          isOccupied={state.isOccupied}
          destination={state.destination}
          setStartPosition={setStartPosition}
          setAvailableMoves={setAvailableMoves}
          setTileFocus={setTileFocus}
        />
      )}
      {/* Pawn END */}

      {/* Rook START*/}
      {(props.tile.includes('a8') || props.tile.includes('h8')) && <Rook tileInfo={state.tileInfo} white={false} />}
      {(props.tile.includes('a1') || props.tile.includes('h1')) && <Rook tileInfo={state.tileInfo} white={true} />}
      {/* Rook END */}

      {/* Knight START */}
      {(props.tile.includes('b8') || props.tile.includes('g8')) && <Knight tileInfo={state.tileInfo} white={false} />}
      {(props.tile.includes('b1') || props.tile.includes('g1')) && <Knight tileInfo={state.tileInfo} white={true} />}
      {/* Knight END */}

      {/* Bishop START */}
      {(props.tile.includes('c8') || props.tile.includes('f8')) && <Bishop tileInfo={state.tileInfo} white={false} />}
      {(props.tile.includes('c1') || props.tile.includes('f1')) && <Bishop tileInfo={state.tileInfo} white={true} />}
      {/* Bishop END */}

      {/* Queen START */}
      {props.tile.includes('d8') && <Queen tileInfo={state.tileInfo} white={false} />}
      {props.tile.includes('d1') && <Queen tileInfo={state.tileInfo} white={true} />}
      {/* Queen END */}

      {/* King START */}
      {props.tile.includes('e8') && <King tileInfo={state.tileInfo} white={false} />}
      {props.tile.includes('e1') && <King tileInfo={state.tileInfo} white={true} />}
      {/* King END */}

      <span className='square-position' style={{ color: labelColor }}>
        {props.tile}
      </span>
      <span
        className='available-moves-circle'
        style={displayCircle() ? { display: 'block' } : { display: 'none' }}
      ></span>
    </div>
  );
}
