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
}

export default function Spot(props: Props) {
  const { tile, x, y, destination, setDestination, setStartPosition, startPosition } = props;
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

  const availableMoves = (currentPosition: Position) => {
    // only valid for white pieces
    return [
      { x: currentPosition.x - 1, y: currentPosition.y + 1 },
      { x: currentPosition.x, y: currentPosition.y + 1 },
      { x: currentPosition.x, y: currentPosition.y + 2 },
      { x: currentPosition.x + 1, y: currentPosition.y + 1 },
    ];
  };

  const onMoveDestination = () => {
    // state is rerendering an entirely new component and console logs after setting state won't have updated state
    setDestination(state.tileInfo);

    // console.log('destination', destination);
    // console.log('startPosition', startPosition);

    let result = availableMoves(startPosition);
    let test: boolean;
    if (result.some((e) => e.x === destination.x && e.y === destination.y)) {
      test = true;
    } else {
      test = false;
    }
  };

  return (
    <div className={'square ' + props.color} onClick={() => onMoveDestination()}>
      {state.tileInfo && props.tile.includes('7') && (
        <Pawn
          tileInfo={state.tileInfo}
          white={false}
          isOccupied={state.isOccupied}
          destination={state.destination}
          setStartPosition={setStartPosition}
          startPosition={startPosition}
        />
      )}
      {props.tile.includes('2') && (
        <Pawn
          tileInfo={state.tileInfo}
          white={true}
          isOccupied={state.isOccupied}
          destination={state.destination}
          setStartPosition={setStartPosition}
          startPosition={startPosition}
        />
      )}
      <span className="square-position">{props.tile}</span>
    </div>
  );
}
