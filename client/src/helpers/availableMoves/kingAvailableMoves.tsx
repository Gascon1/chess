import { Spots } from 'context/SpotsContext';
// import { setCastling } from "components/Board"

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
    const kingCurrentSquare: Spots = getSpotDetails(currentPosition.x, currentPosition.y);

    const castlingMoves = [];

    // WHITE--------------------------------------------------------------------

    // QUEEN SIDE
    const queenSideRookWhite: Spots = getSpotDetails(1, 1);
    const queenSideKnightWhite: Spots = getSpotDetails(2, 1);
    const queenSideBishopWhite: Spots = getSpotDetails(3, 1);
    const queenWhite: Spots = getSpotDetails(4, 1);
    // KING SIDE
    const kingSideBishopWhite: Spots = getSpotDetails(6, 1);
    const kingSideKnightWhite: Spots = getSpotDetails(7, 1);
    const kingSideRookWhite: Spots = getSpotDetails(8, 1);

    // BLACK--------------------------------------------------------------------

    // QUEEN SIDE
    const queenSideRookBlack: Spots = getSpotDetails(1, 8);
    const queenSideKnightBlack: Spots = getSpotDetails(2, 8);
    const queenSideBishopBlack: Spots = getSpotDetails(3, 8);
    const queenBlack: Spots = getSpotDetails(4, 8);
    // KING SIDE
    const kingSideBishopBlack: Spots = getSpotDetails(6, 8);
    const kingSideKnightBlack: Spots = getSpotDetails(7, 8);
    const kingSideRookBlack: Spots = getSpotDetails(8, 8);

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

  const availableMovesChecker = (x: number, y: number) => {
    const currentSquare: Spots = getSpotDetails(currentPosition.x, currentPosition.y);
    const square: Spots = getSpotDetails(currentPosition.x + x, currentPosition.y + y);
    if (square?.isOccupied && square.activePiece.color !== currentSquare?.activePiece.color) {
      return { x: square.tileInfo.x, y: square.tileInfo.y };
    } else if (!square?.isOccupied) {
      return { x: square?.tileInfo.x, y: square?.tileInfo.y };
    } else {
      return { x: 0, y: 0 };
    }
  };

  const availableMoves = () => {
    let kingPossibleMoves = [];
    let castlingMoves = castlingChecker();
    for (let move of castlingMoves) {
      kingPossibleMoves.push(move);
    }
    kingPossibleMoves.push(availableMovesChecker(1, 0));
    kingPossibleMoves.push(availableMovesChecker(-1, 0));
    kingPossibleMoves.push(availableMovesChecker(0, 1));
    kingPossibleMoves.push(availableMovesChecker(0, -1));
    kingPossibleMoves.push(availableMovesChecker(-1, 1));
    kingPossibleMoves.push(availableMovesChecker(1, -1));
    kingPossibleMoves.push(availableMovesChecker(1, 1));
    kingPossibleMoves.push(availableMovesChecker(-1, -1));
    return kingPossibleMoves;
  };

  return availableMoves();
}
