import React, { useState, useEffect } from 'react';
import Pawn from 'components/pieces/Pawn';
// import { start } from 'repl';

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
}

export default function Spot(props: Props) {
  const { tile, x, y, destination, setDestination, setStartPosition, startPosition, tileFocus, setTileFocus } = props;
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

  useEffect(() => {
    setState((prev) => ({ ...prev, tileInfo: { tile, x, y }, destination: destination }));
    if (tile.includes('2')) {
      setState((prev) => ({ ...prev, activePiece: 'pawn', isOccupied: true }));
    } else if (tile.includes('7')) {
      setState((prev) => ({ ...prev, activePiece: 'pawn', isOccupied: true }));
    }
  }, [tile, x, y, destination]);

  const onMoveDestination = (currentPosition: Position, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setDestination(currentPosition);
  };

  return (
    <div
      className={`square ${props.color} ${props.tileFocus === state.tileInfo.tile ? 'focus' : ''}`}
      onClick={(e) => {
        onMoveDestination(state.tileInfo, e);
        setTileFocus(state.tileInfo.tile);
      }}
    >
      {state.tileInfo && props.tile.includes('7') && (
        <Pawn
          tileInfo={state.tileInfo}
          white={false}
          isOccupied={state.isOccupied}
          destination={state.destination}
          setStartPosition={setStartPosition}
        />
      )}
      {props.tile.includes('2') && (
        <Pawn
          tileInfo={state.tileInfo}
          white={true}
          isOccupied={state.isOccupied}
          destination={state.destination}
          setStartPosition={setStartPosition}
        />
      )}
      <span className="square-position">{props.tile}</span>
    </div>
  );
}
