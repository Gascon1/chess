import React, { useState, useEffect } from 'react';
import { ReactComponent as BishopImage } from 'images/bishop.svg';

// export default function Bishop() {
//   return <BishopImage className="piece" />;
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
}

export default function Bishop(props: Props) {
  const { tileInfo, white } = props;
  const [state, setState] = useState({
    hasUsedFirstMoved: false,
    isWhite: true,
    currentPosition: {
      tile: '',
      x: 0,
      y: 0,
    },
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, isWhite: white, currentPosition: tileInfo }));
  }, [tileInfo, white]);
  return <BishopImage className={`piece ${props.white ? 'white' : 'black'}`} />;
}
