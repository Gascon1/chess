import React, { useState, useEffect } from 'react';
import { ReactComponent as QueenImage } from 'images/queen.svg';

// export default function Queen() {
//   return <QueenImage className="piece" />;
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

export default function Queen(props: Props) {
  const { tileInfo, white, setStartPosition, setAvailableMoves, setTileFocus } = props;
  const [state, setState] = useState({
    hasUsedFirstMoved: false,
    isWhite: true,
    pieceType: 'queen',
    currentPosition: {
      tile: '',
      x: 0,
      y: 0,
    },
  });

  const availableMoves = (currentPosition: Position) => {
    //code can be optimized perhaps
    let diagonal = [];
    let i: number = currentPosition.x;
    let k: number = currentPosition.x;
    let a: number = currentPosition.y;
    let b: number = currentPosition.y;
    let c: number = currentPosition.y;
    let d: number = currentPosition.y;
    let e: number = currentPosition.y;
    let f: number = currentPosition.y;

    for (i; i < 9; i++) {
      let possibleMove1 = { x: i, y: c-- };
      let possibleMove2 = { x: i, y: d++ };
      let possibleMove3 = { x: i, y: currentPosition.y };
      if (i === currentPosition.x) {
        continue;
      }
      diagonal.push(possibleMove1);
      diagonal.push(possibleMove2);
      diagonal.push(possibleMove3);
    }
    for (k; k > 0; k--) {
      let possibleMove1 = { x: k, y: e-- };
      let possibleMove2 = { x: k, y: f++ };
      let possibleMove3 = { x: k, y: currentPosition.y };
      if (k === currentPosition.x) {
        continue;
      }
      diagonal.push(possibleMove1);
      diagonal.push(possibleMove2);
      diagonal.push(possibleMove3);
    }
    for (a; a < 9; a++) {
      if (a === currentPosition.y) {
        continue;
      }
      let possibleMove = { x: currentPosition.x, y: a };
      diagonal.push(possibleMove);
    }

    for (b; b > 0; b--) {
      if (b === currentPosition.y) {
        continue;
      }
      let possibleMove = { x: currentPosition.x, y: b };
      diagonal.push(possibleMove);
    }

    return diagonal;
  };

  const onMoveStart = (currentPosition: Position, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    console.log(currentPosition);
    let availMoves = availableMoves(currentPosition);
    setAvailableMoves(availMoves);
    setStartPosition(currentPosition, state.pieceType, state.isWhite ? 'white' : 'black');
    setTileFocus(currentPosition.tile);
  };

  useEffect(() => {
    setState((prev) => ({ ...prev, isWhite: white, currentPosition: tileInfo }));
  }, [tileInfo, white]);
  return (
    <QueenImage
      className={`piece ${props.white ? 'white' : 'black'}`}
      onClick={(e) => onMoveStart(state.currentPosition, e)}
    />
  );
}
