import React, { useState, useEffect } from 'react';
import { ReactComponent as KnightImage } from 'images/knight.svg';

// export default function Knight() {
//   return <KnightImage className="piece" />;
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

export default function Knight(props: Props) {
  const { tileInfo, white, isOccupied, setStartPosition, setAvailableMoves, setTileFocus } = props;
  const [state, setState] = useState({
    hasUsedFirstMoved: false,
    isWhite: true,
    pieceType: 'knight',
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

    return [
      { x: currentPosition.x + 2, y: currentPosition.y + 1 },
      { x: currentPosition.x + 2, y: currentPosition.y - 1 },
      { x: currentPosition.x - 2, y: currentPosition.y - 1 },
      { x: currentPosition.x - 2, y: currentPosition.y + 1 },
      { x: currentPosition.x + 1, y: currentPosition.y + 2 },
      { x: currentPosition.x - 1, y: currentPosition.y + 2 },
      { x: currentPosition.x + 1, y: currentPosition.y - 2 },
      { x: currentPosition.x - 1, y: currentPosition.y - 2 },
    ];
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
    <KnightImage
      className={`piece ${props.white ? 'white' : 'black'}`}
      onClick={(e) => onMoveStart(state.currentPosition, e)}
    />
  );
}
