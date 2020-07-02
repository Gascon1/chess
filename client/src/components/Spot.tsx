import React, { useState, useEffect } from 'react';
import Pawn from 'components/pieces/Pawn';

interface Props {
  color: string;
  tile: string;
  x: number;
  y: number;
  setDestination: Function;
  destination: Object;
}

export default function Spot(props: Props) {
  const { tile, x, y, destination } = props;
  const [state, setState] = useState({
    activePiece: '',
    tileInfo: {
      tile: '',
      x: 0,
      y: 0,
    },
    isOccupied: false,
    destination: destination,
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, tileInfo: { tile, x, y }, destination: destination }));
    if (tile.includes('2')) {
      setState((prev) => ({ ...prev, activePiece: 'pawn', isOccupied: true }));
    } else if (tile.includes('7')) {
      setState((prev) => ({ ...prev, activePiece: 'pawn', isOccupied: true }));
    }
  }, [tile, x, y, destination]);

  return (
    <div className={'square ' + props.color} onClick={() => props.setDestination(state.tileInfo)}>
      {state.tileInfo && props.tile.includes('7') && (
        <Pawn tileInfo={state.tileInfo} white={false} isOccupied={state.isOccupied} destination={state.destination} />
      )}
      {props.tile.includes('2') && (
        <Pawn tileInfo={state.tileInfo} white={true} isOccupied={state.isOccupied} destination={state.destination} />
      )}
      <span className="square-position">{props.tile}</span>
    </div>
  );
}
