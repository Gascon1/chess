import { Spots } from 'context/SpotsContext';

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

export default function PawnAvailableMoves(currentPosition: Position, getSpotDetails: Function) {
  const result: Array<any> = [];
  const currentSquare: Spots | undefined = getSpotDetails(currentPosition.x, currentPosition.y);
  //WHITE
  const forwardOnceWhite: Spots | undefined = getSpotDetails(
    currentPosition.x,
    currentPosition.y + 1,
  );
  const forwardTwiceWhite: Spots | undefined = getSpotDetails(
    currentPosition.x,
    currentPosition.y + 2,
  );
  const diagonalLeftWhite: Spots | undefined = getSpotDetails(
    currentPosition.x + 1,
    currentPosition.y + 1,
  );
  const diagonalRightWhite: Spots | undefined = getSpotDetails(
    currentPosition.x - 1,
    currentPosition.y + 1,
  );
  //BLACK
  const forwardOnceBlack: Spots | undefined = getSpotDetails(
    currentPosition.x,
    currentPosition.y - 1,
  );
  const forwardTwiceBlack: Spots | undefined = getSpotDetails(
    currentPosition.x,
    currentPosition.y - 2,
  );
  const diagonalLeftBlack: Spots | undefined = getSpotDetails(
    currentPosition.x + 1,
    currentPosition.y - 1,
  );
  const diagonalRightBlack: Spots | undefined = getSpotDetails(
    currentPosition.x - 1,
    currentPosition.y - 1,
  );

  if (currentSquare?.activePiece.color === 'white') {
    if (currentSquare.tileInfo.y === 2) {
      if (!forwardTwiceWhite?.isOccupied) {
        result.push({ x: forwardTwiceWhite?.tileInfo.x, y: forwardTwiceWhite?.tileInfo.y });
      }
    }
    if (!forwardOnceWhite?.isOccupied) {
      result.push({ x: forwardOnceWhite?.tileInfo.x, y: forwardOnceWhite?.tileInfo.y });
    }
    if (
      diagonalLeftWhite?.isOccupied &&
      diagonalLeftWhite.activePiece.color !== currentSquare.activePiece.color
    ) {
      result.push({ x: diagonalLeftWhite.tileInfo.x, y: diagonalLeftWhite.tileInfo.y });
    }
    if (
      diagonalRightWhite?.isOccupied &&
      diagonalRightWhite.activePiece.color !== currentSquare.activePiece.color
    ) {
      result.push({ x: diagonalRightWhite.tileInfo.x, y: diagonalRightWhite.tileInfo.y });
    }
  } else if (currentSquare?.activePiece.color === 'black') {
    if (currentSquare?.tileInfo.y === 7) {
      if (!forwardTwiceBlack?.isOccupied) {
        result.push({ x: forwardTwiceBlack?.tileInfo.x, y: forwardTwiceBlack?.tileInfo.y });
      }
    }
    if (!forwardOnceBlack?.isOccupied) {
      result.push({ x: forwardOnceBlack?.tileInfo.x, y: forwardOnceBlack?.tileInfo.y });
    }
    if (
      diagonalLeftBlack?.isOccupied &&
      diagonalLeftBlack.activePiece.color !== currentSquare.activePiece.color
    ) {
      result.push({ x: diagonalLeftBlack.tileInfo.x, y: diagonalLeftBlack.tileInfo.y });
    }
    if (
      diagonalRightBlack?.isOccupied &&
      diagonalRightBlack.activePiece.color !== currentSquare.activePiece.color
    ) {
      result.push({ x: diagonalRightBlack.tileInfo.x, y: diagonalRightBlack.tileInfo.y });
    }
  }

  if (!result.length) {
    result.push({ x: 0, y: 0 });
  }

  // Checks if pawn has availableMove towards end of the board
  // const endPawn = (item: Object, endPoint: number) => {
  //   if (Object.values(item).includes(endPoint, 1)) {
  //     setEndPawn(true);
  //   } else {
  //     setEndPawn(false);
  //   }
  // };
  // if (currentSquare?.activePiece.color === 'white') {
  //   result.forEach((coord) => endPawn(coord, 8));
  // } else {
  //   result.forEach((coord) => endPawn(coord, 1));
  // }

  return result;
}
