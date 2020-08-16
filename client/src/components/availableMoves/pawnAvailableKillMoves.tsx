import { Spots } from 'context/SpotsContext';

interface Position {
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}
export default function pawnAvailableKillMoves(
  currentPosition: Position,
  getSpotDetails: Function,
) {
  let result = [];
  const currentSquare: Spots | undefined = getSpotDetails(currentPosition.x, currentPosition.y);

  if (currentSquare?.activePiece.color === 'white') {
    //WHITE
    const diagonalLeftWhiteSquare: Spots | undefined = getSpotDetails(
      currentPosition.x + 1,
      currentPosition.y + 1,
    );
    const diagonalRightWhiteSquare: Spots | undefined = getSpotDetails(
      currentPosition.x - 1,
      currentPosition.y + 1,
    );
    if (
      diagonalLeftWhiteSquare &&
      diagonalLeftWhiteSquare?.tileInfo.x > 0 &&
      diagonalLeftWhiteSquare?.tileInfo.x < 9 &&
      diagonalLeftWhiteSquare?.tileInfo.y > 0 &&
      diagonalLeftWhiteSquare?.tileInfo.y < 9
    ) {
      if (
        !diagonalLeftWhiteSquare?.isOccupied ||
        diagonalLeftWhiteSquare.activePiece.color === 'black'
      ) {
        const diagonalLeftWhite = {
          x: diagonalLeftWhiteSquare?.tileInfo.x,
          y: diagonalLeftWhiteSquare?.tileInfo.y,
        };
        result.push(diagonalLeftWhite);
      }
    }

    if (
      diagonalRightWhiteSquare &&
      diagonalRightWhiteSquare?.tileInfo.x > 0 &&
      diagonalRightWhiteSquare?.tileInfo.x < 9 &&
      diagonalRightWhiteSquare?.tileInfo.y > 0 &&
      diagonalRightWhiteSquare?.tileInfo.y < 9
    ) {
      if (
        !diagonalRightWhiteSquare?.isOccupied ||
        diagonalRightWhiteSquare.activePiece.color === 'black'
      ) {
        const diagonalRightWhite = {
          x: diagonalRightWhiteSquare?.tileInfo.x,
          y: diagonalRightWhiteSquare?.tileInfo.y,
        };
        result.push(diagonalRightWhite);
      }
    }
  }

  if (currentSquare?.activePiece.color === 'black') {
    //BLACK
    const diagonalLeftBlackSquare: Spots | undefined = getSpotDetails(
      currentPosition.x + 1,
      currentPosition.y - 1,
    );
    const diagonalRightBlackSquare: Spots | undefined = getSpotDetails(
      currentPosition.x - 1,
      currentPosition.y - 1,
    );

    if (
      diagonalLeftBlackSquare &&
      diagonalLeftBlackSquare?.tileInfo.x > 0 &&
      diagonalLeftBlackSquare?.tileInfo.x < 9 &&
      diagonalLeftBlackSquare?.tileInfo.y > 0 &&
      diagonalLeftBlackSquare?.tileInfo.y < 9
    ) {
      if (
        !diagonalLeftBlackSquare?.isOccupied ||
        diagonalLeftBlackSquare.activePiece.color === 'white'
      ) {
        const diagonalLeftBlack = {
          x: diagonalLeftBlackSquare?.tileInfo.x,
          y: diagonalLeftBlackSquare?.tileInfo.y,
        };
        result.push(diagonalLeftBlack);
      }
    }

    if (
      diagonalRightBlackSquare &&
      diagonalRightBlackSquare?.tileInfo.x > 0 &&
      diagonalRightBlackSquare?.tileInfo.x < 9 &&
      diagonalRightBlackSquare?.tileInfo.y > 0 &&
      diagonalRightBlackSquare?.tileInfo.y < 9
    ) {
      if (
        !diagonalRightBlackSquare?.isOccupied ||
        diagonalRightBlackSquare.activePiece.color === 'white'
      ) {
        const diagonalRightBlack = {
          x: diagonalRightBlackSquare?.tileInfo.x,
          y: diagonalRightBlackSquare?.tileInfo.y,
        };
        result.push(diagonalRightBlack);
      }
    }
  }

  return result;
}
