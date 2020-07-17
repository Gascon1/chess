import React, { useState, useEffect, useContext } from 'react';
import { ReactComponent as KingImage } from 'images/king.svg';
import { SpotsContext, Spots } from 'context/SpotsContext';

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
  setCastling: Function;
}

export default function King(props: Props) {
  const { getSpotDetails } = useContext(SpotsContext);
  const { tileInfo, white, setStartPosition, setAvailableMoves, setTileFocus, setCastling } = props;
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
    const kingCurrentSquare: Spots | undefined = getSpotDetails(
      currentPosition.x,
      currentPosition.y,
    );

    const castlingMoves = [];

    // WHITE--------------------------------------------------------------------

    // QUEEN SIDE
    const queenSideRookWhite: Spots | undefined = getSpotDetails(1, 1);
    const queenSideKnightWhite: Spots | undefined = getSpotDetails(2, 1);
    const queenSideBishopWhite: Spots | undefined = getSpotDetails(3, 1);
    const queenWhite: Spots | undefined = getSpotDetails(4, 1);
    // KING SIDE
    const kingSideBishopWhite: Spots | undefined = getSpotDetails(6, 1);
    const kingSideKnightWhite: Spots | undefined = getSpotDetails(7, 1);
    const kingSideRookWhite: Spots | undefined = getSpotDetails(8, 1);

    // BLACK--------------------------------------------------------------------

    // QUEEN SIDE
    const queenSideRookBlack: Spots | undefined = getSpotDetails(1, 8);
    const queenSideKnightBlack: Spots | undefined = getSpotDetails(2, 8);
    const queenSideBishopBlack: Spots | undefined = getSpotDetails(3, 8);
    const queenBlack: Spots | undefined = getSpotDetails(4, 8);
    // KING SIDE
    const kingSideBishopBlack: Spots | undefined = getSpotDetails(6, 8);
    const kingSideKnightBlack: Spots | undefined = getSpotDetails(7, 8);
    const kingSideRookBlack: Spots | undefined = getSpotDetails(8, 8);

    if (
      //KING side castling case for WHITE king
      kingCurrentSquare?.activePiece.color === 'white' &&
      kingCurrentSquare?.tileInfo.tile === 'e1' &&
      !kingCurrentSquare?.hasMoved &&
      kingSideRookWhite?.tileInfo.tile === 'h1' &&
      kingSideRookWhite?.activePiece.pieceType === 'rook' &&
      kingSideRookWhite?.activePiece.color === 'white' &&
      !kingSideRookWhite?.hasMoved &&
      !kingSideKnightWhite?.isOccupied &&
      !kingSideBishopWhite?.isOccupied
    ) {
      castlingMoves.push({ x: 7, y: 1 });
    }
    if (
      //QUEEN side castling case for WHITE king
      kingCurrentSquare?.activePiece.color === 'white' &&
      kingCurrentSquare?.tileInfo.tile === 'e1' &&
      !kingCurrentSquare?.hasMoved &&
      queenSideRookWhite?.tileInfo.tile === 'a1' &&
      queenSideRookWhite?.activePiece.pieceType === 'rook' &&
      queenSideRookWhite?.activePiece.color === 'white' &&
      !queenSideRookWhite?.hasMoved &&
      !queenSideKnightWhite?.isOccupied &&
      !queenSideBishopWhite?.isOccupied &&
      !queenWhite?.isOccupied
    ) {
      castlingMoves.push({ x: 3, y: 1 });
    }
    if (
      //KING side castling case for BLACK king
      kingCurrentSquare?.activePiece.color === 'black' &&
      kingCurrentSquare?.tileInfo.tile === 'e8' &&
      !kingCurrentSquare?.hasMoved &&
      kingSideRookBlack?.tileInfo.tile === 'h8' &&
      kingSideRookBlack?.activePiece.pieceType === 'rook' &&
      kingSideRookBlack?.activePiece.color === 'black' &&
      !kingSideRookBlack?.hasMoved &&
      !kingSideKnightBlack?.isOccupied &&
      !kingSideBishopBlack?.isOccupied
    ) {
      castlingMoves.push({ x: 7, y: 8 });
    }
    if (
      //QUEEN side castling case for BLACK king
      kingCurrentSquare?.activePiece.color === 'black' &&
      kingCurrentSquare?.tileInfo.tile === 'e8' &&
      !kingCurrentSquare?.hasMoved &&
      queenSideRookBlack?.tileInfo.tile === 'a8' &&
      queenSideRookBlack?.activePiece.pieceType === 'rook' &&
      queenSideRookBlack?.activePiece.color === 'black' &&
      !queenSideRookBlack?.hasMoved &&
      !queenSideKnightBlack?.isOccupied &&
      !queenSideBishopBlack?.isOccupied &&
      !queenBlack?.isOccupied
    ) {
      castlingMoves.push({ x: 3, y: 8 });
    }
    if (!castlingMoves.length) {
      castlingMoves.push({ x: 0, y: 0 });
      setCastling(false);
    } else {
      setCastling(true);
    }

    return castlingMoves;
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
    let kingPossibleMoves = [];
    let castlingMoves = castlingChecker(currentPosition);
    for (let move of castlingMoves) {
      kingPossibleMoves.push(move);
    }
    kingPossibleMoves.push(availableMovesChecker(currentPosition, 1, 0));
    kingPossibleMoves.push(availableMovesChecker(currentPosition, -1, 0));
    kingPossibleMoves.push(availableMovesChecker(currentPosition, 0, 1));
    kingPossibleMoves.push(availableMovesChecker(currentPosition, 0, -1));
    kingPossibleMoves.push(availableMovesChecker(currentPosition, -1, 1));
    kingPossibleMoves.push(availableMovesChecker(currentPosition, 1, -1));
    kingPossibleMoves.push(availableMovesChecker(currentPosition, 1, 1));
    kingPossibleMoves.push(availableMovesChecker(currentPosition, -1, -1));
    return kingPossibleMoves;
  };

  const onMoveStart = (
    currentPosition: Position,
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.stopPropagation();
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
