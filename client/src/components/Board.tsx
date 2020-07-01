import React, { useEffect, useState } from 'react';
import isEven from 'helpers/isEven';
import Spot from 'components/Spot';

export default function Board() {
  // Todo: integrate pieces into each square created in board;
  const [state, setState] = useState({
    board: [],
  });

  useEffect(() => {
    const board: any = [];
    const alphaPosition = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const numericPosition = 0;
    for (let j = 8; j > numericPosition; j--) {
      alphaPosition.forEach((value, i) => {
        let spotColor;
        if ((isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))) {
          spotColor = 'beige';
        } else {
          spotColor = 'brown';
        }
        board.push(<Spot color={spotColor} key={value + j} position={value + j} />);
      });
    }

    setState((prev) => ({ ...prev, board }));
  }, []);

  return <div className="board">{state.board}</div>;
}
