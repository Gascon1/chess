import { Spots } from 'context/SpotsContext';

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

export default function KnightAvailableMoves(currentPosition: Position, getSpotDetails: Function) {
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
  return [
    availableMovesChecker(currentPosition, 2, 1),
    availableMovesChecker(currentPosition, 2, -1),
    availableMovesChecker(currentPosition, -2, 1),
    availableMovesChecker(currentPosition, -2, -1),
    availableMovesChecker(currentPosition, -1, 2),
    availableMovesChecker(currentPosition, 1, 2),
    availableMovesChecker(currentPosition, 1, -2),
    availableMovesChecker(currentPosition, -1, -2),
  ];
}
