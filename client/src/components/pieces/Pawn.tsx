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
  destination: Position;
  setStartPosition: Function;
  startPosition: Position;
}

export default function Pawn(props: Props) {
  const { tileInfo, white, isOccupied, destination, setStartPosition, startPosition } = props;
  const [state, setState] = useState({
    hasUsedFirstMoved: false,
    isWhite: true,
    currentPosition: {
      tile: '',
      x: 0,
      y: 0,
    },
    startPosition: startPosition,
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, isWhite: white, currentPosition: tileInfo, startPosition: startPosition }));
  }, [tileInfo, white, startPosition]);

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
          (!destination.isOccupied && destination.x - currentPosition.x !== 0 && destination.y - currentPosition.y !== 1) ||
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
          (!destination.isOccupied && destination.x - currentPosition.x !== 0 && destination.y - currentPosition.y !== -1) ||
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

  const onMoveStart = (event: SyntheticEvent, currentPosition: Position) => {
    setStartPosition(tileInfo);
    // console.log('currentPosition', currentPosition);
    // console.log('availableMoves', availableMoves(currentPosition));
    // console.log('destination', destination);

    // event.stopPropagation();
    // document.onclick = onMoveDestination(currentPosition);
    // let result = availableMoves(currentPosition);
    // var test: boolean;
    // if (result.some((e) => e.x === destination.x && e.y === destination.y)) {
    //   test = true;
    // } else {
    //   test = false;
    // }

    // console.log('is destination valid?', test);
  };

  // how tf does this work bruhhhhhh
  // https://stackoverflow.com/questions/51977823/type-void-is-not-assignable-to-type-event-mouseeventhtmlinputelement
  const onMoveDestination = (currentPosition: Position) => (event: any) => {
    // let destinationCoord = {
    //   x: destination.x,
    //   y: destination.y,
    // };
    let result = availableMoves(startPosition);
    var test: boolean;
    if (result.some((e) => e.x === destination.x && e.y === destination.y)) {
      test = true;
    } else {
      test = false;
    }
    console.log('is destination valid?', test);
  };

  return <PawnImage className={`piece ${props.white ? 'white' : 'black'}`} onClick={(e) => onMoveStart(e, state.currentPosition)} />;
}
