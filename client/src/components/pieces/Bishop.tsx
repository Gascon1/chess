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
  setOccupiedChecker: Function;
}

export default function Bishop(props: Props) {
  const {
    tileInfo,
    white,
    isOccupied,
    setStartPosition,
    setAvailableMoves,
    setTileFocus,
    setOccupiedChecker,
  } = props;

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
    //occupied spot or nah

    //code can be optimized perhaps
    let diagonal = [];
    let i: number = currentPosition.x;
    let k: number = currentPosition.x;
    let b: number = currentPosition.y;
    let c: number = currentPosition.y;
    let d: number = currentPosition.y;
    let e: number = currentPosition.y;

    for (i; i < 9; i++) {
      let possibleMove1 = { x: i, y: b-- };
      let possibleMove2 = { x: i, y: c++ };
      if (i === currentPosition.x) {
        continue;
      }
      setOccupiedChecker(possibleMove1);
      if (!isOccupied) {
      }

      diagonal.push(possibleMove1);
      diagonal.push(possibleMove2);
    }
    for (k; k > 0; k--) {
      let possibleMove1 = { x: k, y: d-- };
      let possibleMove2 = { x: k, y: e++ };
      if (k === currentPosition.x) {
        continue;
      }

      diagonal.push(possibleMove1);
      diagonal.push(possibleMove2);
    }

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
      onClick={(e) => onMoveStart(state.currentPosition, e)}
    />
  );
}
