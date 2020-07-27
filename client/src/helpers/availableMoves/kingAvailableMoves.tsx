import { Spots } from 'context/SpotsContext';

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

export default function KingAvailableMoves(
  currentPosition: Position,
  setCastling: Function,
  getSpotDetails: Function,
) {
  const castlingChecker = () => {
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
      setCastling(false);
    } else {
      setCastling(true);
    }

    return castlingMoves;
  };

  const availableMovesChecker = (x: number, y: number) => {
    const currentSquare: Spots | undefined = getSpotDetails(currentPosition.x, currentPosition.y);
    const square: Spots | undefined = getSpotDetails(currentPosition.x + x, currentPosition.y + y);
    if (
      square?.tileInfo != undefined &&
      square?.tileInfo.x >= 1 &&
      square?.tileInfo.x <= 8 &&
      square?.tileInfo.y >= 1 &&
      square?.tileInfo.y <= 8
    ) {
      if (square?.isOccupied && square.activePiece.color !== currentSquare?.activePiece.color) {
        return { x: square.tileInfo.x, y: square.tileInfo.y };
      } else if (!square?.isOccupied) {
        return { x: square?.tileInfo.x, y: square?.tileInfo.y };
      }
    }
  };

  const isUndefined = (obj: Object | undefined) => {
    if (obj) {
      return true;
    }
    return false;
  };

  const availableMoves = () => {
    let kingPossibleMoves = [];
    let up = availableMovesChecker(1, 0);
    let left = availableMovesChecker(-1, 0);
    let right = availableMovesChecker(0, 1);
    let down = availableMovesChecker(0, -1);
    let leftUp = availableMovesChecker(-1, 1);
    let rightDown = availableMovesChecker(1, -1);
    let rightUp = availableMovesChecker(1, 1);
    let leftDown = availableMovesChecker(-1, -1);
    let castlingMoves = castlingChecker();
    for (let move of castlingMoves) {
      kingPossibleMoves.push(move);
    }
    if (isUndefined(up)) {
      kingPossibleMoves.push(up);
    }
    if (isUndefined(left)) {
      kingPossibleMoves.push(left);
    }
    if (isUndefined(right)) {
      kingPossibleMoves.push(right);
    }
    if (isUndefined(down)) {
      kingPossibleMoves.push(down);
    }
    if (isUndefined(rightUp)) {
      kingPossibleMoves.push(rightUp);
    }
    if (isUndefined(leftUp)) {
      kingPossibleMoves.push(leftUp);
    }
    if (isUndefined(leftDown)) {
      kingPossibleMoves.push(leftDown);
    }
    if (isUndefined(rightDown)) {
      kingPossibleMoves.push(rightDown);
    }

    return kingPossibleMoves;
  };

  return availableMoves();
}
