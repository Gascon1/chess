import React, { useState, useEffect } from 'react';
import { ReactComponent as KingImage } from 'images/king.svg';

// export default function King() {
//   return <KingImage className="piece" />;
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

export default function King(props: Props) {
  const { tileInfo, white, isOccupied, setStartPosition, setAvailableMoves, setTileFocus } = props;
  const [state, setState] = useState({
    hasUsedFirstMoved: false,
    isWhite: true,
    pieceType: 'king',
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
      { x: currentPosition.x + 1, y: currentPosition.y },
      { x: currentPosition.x - 1, y: currentPosition.y },
      { x: currentPosition.x, y: currentPosition.y + 1 },
      { x: currentPosition.x, y: currentPosition.y - 1 },
      { x: currentPosition.x + 1, y: currentPosition.y + 1 },
      { x: currentPosition.x + 1, y: currentPosition.y - 1 },
      { x: currentPosition.x - 1, y: currentPosition.y + 1 },
      { x: currentPosition.x - 1, y: currentPosition.y - 1 },
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
    <KingImage
      className={`piece ${props.white ? 'white' : 'black'}`}
      onClick={(e) => onMoveStart(state.currentPosition, e)}
    />
  );
}
