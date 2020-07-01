import React, { useState, useEffect } from 'react';
import Pawn from 'components/pieces/Pawn';
import Rook from 'components/pieces/Rook';
interface Props {
  color: string;
  tile: string;
  x: number;
  y: number;
}
const brown = '#874626';
const beige = '#e5c59b';

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
      labelColor = beige;
      break;
    case 'beige':
      labelColor = brown;
  }

  useEffect(() => {
    setState((prev) => ({ ...prev, tileInfo: { tile, x, y } }));
    if (tile.includes('2')) {
      setState((prev) => ({ ...prev, activePiece: 'pawn' }));
    } else if (tile.includes('7')) {
      setState((prev) => ({ ...prev, activePiece: 'pawn' }));
    } else if (tile.includes('a8') || tile.includes('h8')) {
      setState((prev) => ({ ...prev, activePiece: 'rook' }));
    } else if (tile.includes('a1') || tile.includes('h1')) {
      setState((prev) => ({ ...prev, activePiece: 'rook' }));
    }
  }, [tile, x, y]);

  return (
    <div className={'square ' + props.color}>
      {/* Pawn START */}
      {state.tileInfo && props.tile.includes('7') && <Pawn tileInfo={state.tileInfo} white={false} />}
      {props.tile.includes('2') && <Pawn tileInfo={state.tileInfo} white={true} />}
      {/* Pawn END */}

      {/* Rook START*/}
      {(props.tile.includes('a8') || props.tile.includes('h8')) && <Rook tileInfo={state.tileInfo} white={false} />}
      {(props.tile.includes('a1') || props.tile.includes('h1')) && <Rook tileInfo={state.tileInfo} white={true} />}
      {/* Rook END */}

      <span className="square-position" style={{ color: labelColor }}>
        {props.tile}
      </span>
    </div>
  );
}
