import React, { useState, useEffect, useContext } from 'react';
import { ReactComponent as QueenImage } from 'images/queen.svg';
import { SpotsContext } from 'context/SpotsContext';
import QueenAvailableMoves from 'components/availableMoves/queenAvailableMoves';

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
  turn: number;
  endPawn: {
    flag: boolean;
    color: string;
  };
}

export default function Queen(props: Props) {
  const { getSpotDetails } = useContext(SpotsContext);
  const {
    tileInfo,
    white,
    setStartPosition,
    setAvailableMoves,
    setTileFocus,
    turn,
    endPawn,
  } = props;
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

  const onMoveStart = (
    currentPosition: Position,
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    // let availMoves = availableMoves(currentPosition);
    let availMoves = QueenAvailableMoves(currentPosition, getSpotDetails);
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
      onClick={(e) => {
        if (!endPawn.flag) {
          if (!turn && props.white) {
            onMoveStart(state.currentPosition, e);
          } else if (turn && !props.white) {
            onMoveStart(state.currentPosition, e);
          }
        }
      }}
    />
  );
}
