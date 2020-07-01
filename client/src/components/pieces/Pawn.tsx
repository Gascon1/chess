import React, { useState, useEffect } from 'react';
import { ReactComponent as PawnImage } from 'images/pawn.svg';

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
}

interface Props {
  white: boolean;
  tileInfo: Position;
}

export default function Pawn(props: Props) {
  const { tileInfo, white } = props;
  const [state, setState] = useState({
    hasUsedFirstMoved: false,
    isWhite: true,
    currentPosition: {
      tile: '',
      x: 0,
      y: 0,
    },
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, isWhite: white, currentPosition: tileInfo }));
  }, [tileInfo, white]);

  const isMoveLegal = (currentPosition: Position, destination: Position) => {
    if (state.isWhite) {
      if (!state.hasUsedFirstMoved && destination.x - currentPosition.x === 0 && destination.y - currentPosition.y === 2) {
        setState({ ...state, hasUsedFirstMoved: true });
        return true;
      } else {
        // first, we check if the pawn is moving in a vertical line,
        // and if it is only going forward by 1 spot. Then, we check
        // if the pawn is going for a kill, which needs the destination
        // to be occuped, and both x and y increment by 1.
        return (
          (destination.x - currentPosition.x !== 0 && destination.y - currentPosition.y !== 1) ||
          (destination.isOccupied && destination.x - currentPosition.x !== 1 && destination.y - currentPosition.y !== 1)
        );
      }
    } else {
      if (!state.hasUsedFirstMoved && destination.x - currentPosition.x === 0 && destination.y - currentPosition.y === -2) {
        setState({ ...state, hasUsedFirstMoved: true });
        return true;
      } else {
        return (
          (destination.x - currentPosition.x !== 0 && destination.y - currentPosition.y !== -1) ||
          (destination.isOccupied && destination.x - currentPosition.x !== -1 && destination.y - currentPosition.y !== -1)
        );
      }
    }
  };

  const onMoveStart = (currentPosition: Position) => {
    console.log(currentPosition);
  };

  return <PawnImage className={`piece ${props.white ? 'white' : 'black'}`} onClick={() => onMoveStart(state.currentPosition)} />;
}
