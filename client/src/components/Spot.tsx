import React, { useState, useEffect } from 'react';
import Pawn from 'components/pieces/Pawn';

interface Props {
  color: string;
  tile: string;
  x: number;
  y: number;
}

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
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
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, tileInfo: { tile, x, y } }));
  }, [tile, x, y]);

  return (
    <div className={'square ' + props.color}>
      {state.tileInfo && props.tile.includes('7') && <Pawn tileInfo={state.tileInfo} white={false} />}
      {props.tile.includes('2') && <Pawn tileInfo={state.tileInfo} white={true} />}
      <span className="square-position">{props.tile}</span>
    </div>
  );
}
