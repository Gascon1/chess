import React, { useState, useEffect, SyntheticEvent } from 'react';
import { ReactComponent as PawnImage } from 'images/pawn.svg';
// import Spot from "../Spot";

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

interface Props {
  white: boolean;
  tileInfo: Position;
  isOccupied: boolean;
  setStartPosition: Function;
  setAvailableMoves: Function;
  setTileFocus: Function;
}

export default function Pawn(props: Props) {
  const { tileInfo, white, isOccupied, setStartPosition, setAvailableMoves, setTileFocus } = props;
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
      if (
        !state.hasUsedFirstMoved &&
        !destination.isOccupied &&
        destination.x - currentPosition.x === 0 &&
        destination.y - currentPosition.y === 2
      ) {
        setState({ ...state, hasUsedFirstMoved: true });
        return true;
      } else {
        // first, we check if the pawn is moving in a vertical line,
        // and if it is only going forward by 1 spot. Then, we check
        // if the pawn is going for a kill, which needs the destination
        // to be occuped, and both x and y increment by 1.
        return (
          (!destination.isOccupied &&
            destination.x - currentPosition.x !== 0 &&
            destination.y - currentPosition.y !== 1) ||
          (destination.isOccupied &&
            !destination.isFriendly &&
            destination.x - currentPosition.x !== 1 &&
            destination.y - currentPosition.y !== 1) ||
          (destination.isOccupied &&
            !destination.isFriendly &&
            destination.x - currentPosition.x !== -1 &&
            destination.y - currentPosition.y !== 1)
        );
      }
    } else {
      if (
        !state.hasUsedFirstMoved &&
        !destination.isOccupied &&
        destination.x - currentPosition.x === 0 &&
        destination.y - currentPosition.y === -2
      ) {
        setState({ ...state, hasUsedFirstMoved: true });
        return true;
      } else {
        return (
          (!destination.isOccupied &&
            destination.x - currentPosition.x !== 0 &&
            destination.y - currentPosition.y !== -1) ||
          (destination.isOccupied &&
            !destination.isFriendly &&
            destination.x - currentPosition.x !== -1 &&
            destination.y - currentPosition.y !== -1) ||
          (destination.isOccupied &&
            !destination.isFriendly &&
            destination.x - currentPosition.x !== -1 &&
            destination.y - currentPosition.y !== 1)
        );
      }
    }
  };

  const availableMoves = (currentPosition: Position) => {
    if (state.isWhite) {
      return [
        { x: currentPosition.x - 1, y: currentPosition.y + 1 },
        { x: currentPosition.x, y: currentPosition.y + 1 },
        { x: currentPosition.x, y: currentPosition.y + 2 },
        { x: currentPosition.x + 1, y: currentPosition.y + 1 },
      ];
    } else {
      return [
        { x: currentPosition.x - 1, y: currentPosition.y - 1 },
        { x: currentPosition.x, y: currentPosition.y - 1 },
        { x: currentPosition.x, y: currentPosition.y - 2 },
        { x: currentPosition.x + 1, y: currentPosition.y - 1 },
      ];
    }
  };

  const onMoveStart = (currentPosition: Position, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    let availMoves = availableMoves(currentPosition);
    setAvailableMoves(availMoves);
    setStartPosition(currentPosition);
    setTileFocus(currentPosition.tile);
  };

  return JSON.stringify(tileInfo) === JSON.stringify(state.currentPosition) ? (
    <PawnImage
      className={`piece ${props.white ? 'white' : 'black'}`}
      onClick={(e) => onMoveStart(state.currentPosition, e)}
    />
  ) : (
    <div></div>
  );
}
