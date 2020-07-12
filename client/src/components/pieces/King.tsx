import React, { useState, useEffect, useContext } from 'react';
import { ReactComponent as KingImage } from 'images/king.svg';
import { SpotsContext } from 'context/SpotsContext';

// export default function King() {
//   return <KingImage className="piece" />;
// }

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

interface Moves {
  x: number;
  y: number;
}

interface Props {
  white: boolean;
  tileInfo: Position;
  //isOccupied: boolean;
  setStartPosition: Function;
  setAvailableMoves: Function;
  setTileFocus: Function;
}

export default function King(props: Props) {
  const { getSpotDetails } = useContext(SpotsContext);
  const {
    tileInfo,
    white,
    /*isOccupied,*/ setStartPosition,
    setAvailableMoves,
    setTileFocus,
  } = props;
  const [state, setState] = useState({
    hasUsedFirstMoved: false,
    isWhite: true,
    pieceType: 'king',
    currentPosition: {
      tile: '',
      x: 0,
      y: 0,
    },
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, isWhite: white, currentPosition: tileInfo }));
  }, [tileInfo, white]);

  const availableMovesChecker = (currentPosition: Position, x: number, y: number) => {
    const currentSquare = getSpotDetails(currentPosition.x, currentPosition.y);
    const square = getSpotDetails(currentPosition.x + x, currentPosition.y + y);
    if (square.isOccupied && square.activePiece.color !== currentSquare.activePiece.color) {
      return { x: square.tileInfo.x, y: square.tileInfo.y };
    } else if (!square.isOccupied) {
      return { x: square.tileInfo.x, y: square.tileInfo.y };
    } else {
      return { x: 0, y: 0 };
    }
  };

  const availableMoves = (currentPosition: Position) => {
    return [
      availableMovesChecker(currentPosition, 1, 0),
      availableMovesChecker(currentPosition, -1, 0),
      availableMovesChecker(currentPosition, 0, 1),
      availableMovesChecker(currentPosition, 0, -1),
      availableMovesChecker(currentPosition, -1, 1),
      availableMovesChecker(currentPosition, 1, -1),
      availableMovesChecker(currentPosition, 1, 1),
      availableMovesChecker(currentPosition, -1, -1),
    ];
  };

  const onMoveStart = (
    currentPosition: Position,
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    console.log(currentPosition);
    let availMoves = availableMoves(currentPosition);
    setAvailableMoves(availMoves);
    setStartPosition(currentPosition, state.pieceType, state.isWhite ? 'white' : 'black');
    setTileFocus(currentPosition.tile);
  };

  return (
    <KingImage
      className={`piece ${props.white ? 'white' : 'black'}`}
      onClick={(e) => {
        onMoveStart(state.currentPosition, e);
        // Example of how to use getSpotDetails
        console.log(getSpotDetails(state.currentPosition.x, state.currentPosition.y));
      }}
    />
  );
}
