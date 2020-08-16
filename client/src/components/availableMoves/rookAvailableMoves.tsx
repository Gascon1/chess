import { Spots } from 'context/SpotsContext';

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

export default function RookAvailableMoves(currentPosition: Position, getSpotDetails: Function) {
  //code can be optimized perhaps
  let straightLine = [];
  let i: number = currentPosition.x;
  let j: number = currentPosition.x;
  let a: number = currentPosition.y;
  let b: number = currentPosition.y;

  const currentSpot: Spots | undefined = getSpotDetails(currentPosition.x, currentPosition.y);

  for (i; i < 9; i++) {
    let rightRow = { x: i, y: currentPosition.y };

    if (i === currentPosition.x) {
      continue;
    }

    let rightSquare: Spots | undefined = getSpotDetails(rightRow.x, rightRow.y);

    if (rightSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== rightSquare.activePiece.color) {
        straightLine.push(rightRow);
        break;
      } else {
        break;
      }
    } else {
      straightLine.push(rightRow);
    }
  }
  for (j; j > 0; j--) {
    let leftRow = { x: j, y: currentPosition.y };

    if (j === currentPosition.x) {
      continue;
    }

    let leftSquare: Spots | undefined = getSpotDetails(leftRow.x, leftRow.y);

    if (leftSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== leftSquare.activePiece.color) {
        straightLine.push(leftRow);
        break;
      } else {
        break;
      }
    } else {
      straightLine.push(leftRow);
    }
  }
  for (a; a < 9; a++) {
    let upRow = { x: currentPosition.x, y: a };

    if (a === currentPosition.y) {
      continue;
    }

    let upSquare: Spots | undefined = getSpotDetails(upRow.x, upRow.y);

    if (upSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== upSquare.activePiece.color) {
        straightLine.push(upRow);
        break;
      } else {
        break;
      }
    } else {
      straightLine.push(upRow);
    }
  }
  for (b; b > 0; b--) {
    let downRow = { x: currentPosition.x, y: b };

    if (b === currentPosition.y) {
      continue;
    }

    let downSquare: Spots | undefined = getSpotDetails(downRow.x, downRow.y);

    if (downSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== downSquare.activePiece.color) {
        straightLine.push(downRow);
        break;
      } else {
        break;
      }
    } else {
      straightLine.push(downRow);
    }
  }
  return straightLine;
}
