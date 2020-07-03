import React, { useState, useEffect } from 'react';
import { ReactComponent as RookImage } from 'images/rook.svg';

// export default function Rook() {
//   return <RookImage className="piece" />;
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
  isOccupied: boolean;
  setStartPosition: Function;
  setAvailableMoves: Function;
  setTileFocus: Function;
}

export default function Rook(props: Props) {
  const { tileInfo, white, isOccupied, setStartPosition, setAvailableMoves, setTileFocus } = props;
  const [state, setState] = useState({
    hasUsedFirstMoved: false,
    pieceType: 'rook',
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
    let straightLine = [];
    let i: number = currentPosition.x;
    let j: number = currentPosition.x;
    let a: number = currentPosition.y;
    let b: number = currentPosition.y;

    for (i; i < 9; i++) {
      if (i === currentPosition.x) {
        continue;
      }
      let possibleMove = { x: i, y: currentPosition.y };
      straightLine.push(possibleMove);
    }
    for (j; j > 0; j--) {
      if (j === currentPosition.x) {
        continue;
      }
      let possibleMove = { x: j, y: currentPosition.y };
      straightLine.push(possibleMove);
    }
    for (a; a < 9; a++) {
      if (a === currentPosition.y) {
        continue;
      }
      let possibleMove = { x: currentPosition.x, y: a };
      straightLine.push(possibleMove);
    }
    for (b; b > 0; b--) {
      if (b === currentPosition.y) {
        continue;
      }
      let possibleMove = { x: currentPosition.x, y: b };
      straightLine.push(possibleMove);
    }

    return straightLine;
  };

  const onMoveStart = (currentPosition: Position, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    console.log(currentPosition);
    let availMoves = availableMoves(currentPosition);
    setAvailableMoves(availMoves);
    setStartPosition(currentPosition, state.pieceType, state.isWhite ? 'white' : 'black');
    setTileFocus(currentPosition.tile);
  };

  return (
    <RookImage
      className={`piece ${props.white ? 'white' : 'black'}`}
      onClick={(e) => onMoveStart(state.currentPosition, e)}
    />
  );
}
