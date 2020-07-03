import React, { useState, useEffect } from 'react';
import { ReactComponent as BishopImage } from 'images/bishop.svg';

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
  isOccupied: boolean;
  setStartPosition: Function;
  setAvailableMoves: Function;
  setTileFocus: Function;
}

export default function Bishop(props: Props) {
  const { tileInfo, white, isOccupied, setStartPosition, setAvailableMoves, setTileFocus } = props;
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
    let diagonal = [];
    let i: number = currentPosition.x;
    let k: number = currentPosition.x;
    let b: number = currentPosition.y;
    let c: number = currentPosition.y;
    let d: number = currentPosition.y;
    let e: number = currentPosition.y;

    console.log('x is', i);
    for (i; i < 9; i++) {
      let possibleMove1 = { x: i, y: b-- };
      let possibleMove2 = { x: i, y: c++ };
      diagonal.push(possibleMove1);
      diagonal.push(possibleMove2);
    }
    for (k; k > 0; k--) {
      let possibleMove1 = { x: k, y: d-- };
      let possibleMove2 = { x: k, y: e++ };
      diagonal.push(possibleMove1);
      diagonal.push(possibleMove2);
    }
    // for (i; i < 9; i++) {
    //   let possibleMove = { x: i, y: currentPosition.y++ };
    //   diagonal.push(possibleMove);
    // }
    // for (i; i < 9; i++) {
    //   let possibleMove = { x: i, y: currentPosition.y++ };
    //   diagonal.push(possibleMove);
    // }
    // for (i; i > 0; i++) {
    //   let possibleMove = { x: currentPosition.x - i, y: currentPosition.y - i };
    //   diagonal.push(possibleMove);
    // }
    if (state.isWhite) {
      return diagonal;
    } else {
      return diagonal;
    }
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
    <BishopImage
      className={`piece ${props.white ? 'white' : 'black'}`}
      onClick={(e) => onMoveStart(state.currentPosition, e)}
    />
  );
}
