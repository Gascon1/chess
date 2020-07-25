import React, { useState, useEffect, useContext } from 'react';
import { ReactComponent as KnightImage } from 'images/knight.svg';
import { SpotsContext, Spots } from 'context/SpotsContext';
import KnightAvailableMoves from 'helpers/availableMoves/knightAvailableMoves';

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
  setStartPosition: Function;
  setAvailableMoves: Function;
  setTileFocus: Function;
}

export default function Knight(props: Props) {
  const { getSpotDetails } = useContext(SpotsContext);
  const { tileInfo, white, setStartPosition, setAvailableMoves, setTileFocus } = props;
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

  const onMoveStart = (
    currentPosition: Position,
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    let availMoves = KnightAvailableMoves(currentPosition, getSpotDetails);
    setAvailableMoves(availMoves);
    setStartPosition(currentPosition, state.pieceType, state.isWhite ? 'white' : 'black');
    setTileFocus(currentPosition.tile);
  };

  return (
    <KnightImage
      className={`piece ${props.white ? 'white' : 'black'}`}
      onClick={(e) => {
        onMoveStart(state.currentPosition, e);
      }}
    />
  );
}
