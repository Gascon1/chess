import React, { useState, useEffect } from 'react';
import Pawn from 'components/pieces/Pawn';
interface Props {
  color: string;
  tile: string;
  x: number;
  y: number;
}

let $brown = '#874626';
let $beige = '#e5c59b';

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

  let labelColor = '';
  switch (props.color) {
    case 'brown':
      labelColor = $beige;
      break;
    case 'beige':
      labelColor = $brown;
  }

  useEffect(() => {
    setState((prev) => ({ ...prev, tileInfo: { tile, x, y } }));
    if (tile.includes('2')) {
      setState((prev) => ({ ...prev, activePiece: 'pawn' }));
    } else if (tile.includes('7')) {
      setState((prev) => ({ ...prev, activePiece: 'pawn' }));
    }
  }, [tile, x, y]);

  return (
    <div className={'square ' + props.color}>
      {state.tileInfo && props.tile.includes('7') && <Pawn tileInfo={state.tileInfo} white={false} />}
      {props.tile.includes('2') && <Pawn tileInfo={state.tileInfo} white={true} />}
      <span className="square-position" style={{ color: labelColor }}>
        {props.tile}
      </span>
    </div>
  );
}
