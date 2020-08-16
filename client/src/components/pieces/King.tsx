import React, { useState, useEffect, useContext } from 'react';
import { ReactComponent as KingImage } from 'images/king.svg';
import { SpotsContext } from 'context/SpotsContext';
import KingAvailableMoves from 'components/availableMoves/kingAvailableMoves';

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
  turn: number;
  endPawn: {
    flag: boolean;
    color: string;
  };
}

export default function King(props: Props) {
  const { getSpotDetails } = useContext(SpotsContext);
  const {
    tileInfo,
    white,
    setStartPosition,
    setAvailableMoves,
    setTileFocus,
    setCastling,
    turn,
    endPawn,
  } = props;
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

  const onMoveStart = (
    currentPosition: Position,
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    let availMoves = KingAvailableMoves(currentPosition, setCastling, getSpotDetails);
    setAvailableMoves(availMoves);
    setStartPosition(currentPosition, state.pieceType, state.isWhite ? 'white' : 'black');
    setTileFocus(currentPosition.tile);
  };

  return (
    <KingImage
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
