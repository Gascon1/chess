import React, { useState, useEffect, useContext } from 'react';
import { ReactComponent as BishopImage } from 'images/bishop.svg';
import { SpotsContext, Spots } from 'context/SpotsContext';

// export default function Bishop() {
//   return <BishopImage className="piece" />;
// }

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

interface Props {
  white: boolean;
  tileInfo: Position;
  setStartPosition: Function;
  setAvailableMoves: Function;
  setTileFocus: Function;
  setCastling: Function;
}

export default function Bishop(props: Props) {
  const { getSpotDetails } = useContext(SpotsContext);
  const { tileInfo, white, setStartPosition, setAvailableMoves, setTileFocus, setCastling } = props;

  const [state, setState] = useState({
    hasUsedFirstMoved: false,
    pieceType: 'bishop',
    isWhite: true,
    currentPosition: {
      tile: '',
      x: 0,
      y: 0,
    },
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, isWhite: white, currentPosition: tileInfo }));
  }, [tileInfo, white]);

  const availableMoves = (currentPosition: Position) => {
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
    setCastling(false);
    return diagonal;
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
    <BishopImage
      className={`piece ${props.white ? 'white' : 'black'}`}
      onClick={(e) => {
        onMoveStart(state.currentPosition, e);
      }}
    />
  );
}
