import React, { useState, useEffect } from 'react';
import Pawn from 'components/pieces/Pawn';

interface Props {
  color: string;
  tile: string;
  x: number;
  y: number;
}

export default function Spot(props: Props) {
  const { tile, x, y } = props;
  const [state, setState] = useState({
    activePiece: '',
    tileInfo: {
      tile: '',
      x: 0,
      y: 0,
    },
    isOccupied: false,
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, tileInfo: { tile, x, y } }));
    if (tile.includes('2')) {
      setState((prev) => ({ ...prev, activePiece: 'pawn', isOccupied: true }));
    } else if (tile.includes('7')) {
      setState((prev) => ({ ...prev, activePiece: 'pawn', isOccupied: true }));
    }
  }, [tile, x, y]);

  return (
    <div className={'square ' + props.color}>
      {state.tileInfo && props.tile.includes('7') && <Pawn tileInfo={state.tileInfo} white={false} isOccupied={state.isOccupied} />}
      {props.tile.includes('2') && <Pawn tileInfo={state.tileInfo} white={true} isOccupied={state.isOccupied} />}
      <span className="square-position">{props.tile}</span>
    </div>
  );
}
