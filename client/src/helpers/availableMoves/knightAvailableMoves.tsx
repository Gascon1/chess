import { Spots } from 'context/SpotsContext';

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

export default function KnightAvailableMoves(currentPosition: Position, getSpotDetails: Function) {
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
    let knightPossibleMoves = [];
    let leftUp = availableMovesChecker(2, 1);
    let leftDown = availableMovesChecker(2, -1);
    let rightUp = availableMovesChecker(-2, 1);
    let rightDown = availableMovesChecker(-2, -1);
    let upLeft = availableMovesChecker(-1, 2);
    let upRight = availableMovesChecker(1, 2);
    let downLeft = availableMovesChecker(1, -2);
    let downRight = availableMovesChecker(-1, -2);
    if (isUndefined(leftUp)) {
      knightPossibleMoves.push(leftUp);
    }
    if (isUndefined(leftDown)) {
      knightPossibleMoves.push(leftDown);
    }
    if (isUndefined(rightUp)) {
      knightPossibleMoves.push(rightUp);
    }
    if (isUndefined(rightDown)) {
      knightPossibleMoves.push(rightDown);
    }
    if (isUndefined(upLeft)) {
      knightPossibleMoves.push(upLeft);
    }
    if (isUndefined(upRight)) {
      knightPossibleMoves.push(upRight);
    }
    if (isUndefined(downLeft)) {
      knightPossibleMoves.push(downLeft);
    }
    if (isUndefined(downRight)) {
      knightPossibleMoves.push(downRight);
    }
    return knightPossibleMoves;
  };
  return availableMoves();
}
