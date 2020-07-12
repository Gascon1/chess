import React, { useState, useEffect, useContext } from 'react';
import { ReactComponent as KingImage } from 'images/king.svg';
import { SpotsContext, Spots } from 'context/SpotsContext';

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
  setStartPosition: Function;
  setAvailableMoves: Function;
  setTileFocus: Function;
}

export default function King(props: Props) {
  const { getSpotDetails } = useContext(SpotsContext);
  const { tileInfo, white, setStartPosition, setAvailableMoves, setTileFocus } = props;
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

  const castlingChecker = (currentPosition: Position) => {
    const queenSideRookWhite: Spots | undefined = getSpotDetails(1, 1);
    const currentSquare: Spots | undefined = getSpotDetails(currentPosition.x, currentPosition.y);
    const kingSideBishopWhite: Spots | undefined = getSpotDetails(6, 1);
    const kingSideKnightWhite: Spots | undefined = getSpotDetails(7, 1);
    const kingSideRookWhite: Spots | undefined = getSpotDetails(8, 1);

    if (
      //king side castling case for white king
      currentSquare?.activePiece.color === 'white' &&
      currentSquare?.tileInfo.tile === 'e1' &&
      // !currentSquare?.hasUpdated &&
      kingSideRookWhite?.tileInfo.tile === 'h1' &&
      kingSideRookWhite?.activePiece.pieceType === 'rook' &&
      kingSideRookWhite?.activePiece.color === 'white' &&
      // !kingSideRookWhite?.hasUpdated &&
      !kingSideKnightWhite?.isOccupied &&
      !kingSideBishopWhite?.isOccupied
    ) {
      console.log('success');
    }
    console.log(currentSquare);
    console.log('bishop', kingSideBishopWhite);
    console.log('knight', kingSideKnightWhite);
    console.log('rook', kingSideRookWhite);

    console.log('fail');
  };

  const availableMovesChecker = (currentPosition: Position, x: number, y: number) => {
    const currentSquare: Spots | undefined = getSpotDetails(currentPosition.x, currentPosition.y);
    const square: Spots | undefined = getSpotDetails(currentPosition.x + x, currentPosition.y + y);
    if (square?.isOccupied && square.activePiece.color !== currentSquare?.activePiece.color) {
      return { x: square.tileInfo.x, y: square.tileInfo.y };
    } else if (!square?.isOccupied) {
      return { x: square?.tileInfo.x, y: square?.tileInfo.y };
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
      castlingChecker(currentPosition),
      //add castling function call here
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
      }}
    />
  );
}
