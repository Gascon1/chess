import { Spots } from 'context/SpotsContext';

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

export default function BishopAvailableMoves(currentPosition: Position, getSpotDetails: Function) {
  //code can be optimized perhaps
  let diagonal = [];

  let i: number = currentPosition.x;
  let j: number = currentPosition.x;
  let k: number = currentPosition.x;
  let l: number = currentPosition.x;

  let b: number = currentPosition.y;
  let c: number = currentPosition.y;
  let d: number = currentPosition.y;
  let e: number = currentPosition.y;

  const currentSpot: Spots | undefined = getSpotDetails(currentPosition.x, currentPosition.y);

  for (i; i < 9; i++) {
    let downRight = { x: i, y: b-- };

    if (i === currentPosition.x) {
      continue;
    }

    let downRightSquare: Spots | undefined = getSpotDetails(downRight.x, downRight.y);

    if (downRightSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== downRightSquare.activePiece.color) {
        diagonal.push(downRight);
        break;
      } else {
        break;
      }
    } else {
      diagonal.push(downRight);
    }
  }

  for (j; j < 9; j++) {
    let upRight = { x: j, y: c++ };
    if (j === currentPosition.x) {
      continue;
    }
    let upRightSquare: Spots | undefined = getSpotDetails(upRight.x, upRight.y);
    if (upRightSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== upRightSquare.activePiece.color) {
        diagonal.push(upRight);
        break;
      } else {
        break;
      }
    } else {
      diagonal.push(upRight);
    }
  }
  for (k; k > 0; k--) {
    let downLeft = { x: k, y: d-- };

    if (k === currentPosition.x) {
      continue;
    }
    let downLeftSquare: Spots | undefined = getSpotDetails(downLeft.x, downLeft.y);
    if (downLeftSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== downLeftSquare.activePiece.color) {
        diagonal.push(downLeft);
        break;
      } else {
        break;
      }
    } else {
      diagonal.push(downLeft);
    }
  }

  for (l; l > 0; l--) {
    let upLeft = { x: l, y: e++ };
    if (l === currentPosition.x) {
      continue;
    }
    let upLeftSquare: Spots | undefined = getSpotDetails(upLeft.x, upLeft.y);
    if (upLeftSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== upLeftSquare.activePiece.color) {
        diagonal.push(upLeft);
        break;
      } else {
        break;
      }
    } else {
      diagonal.push(upLeft);
    }
  }

  return diagonal;
}
