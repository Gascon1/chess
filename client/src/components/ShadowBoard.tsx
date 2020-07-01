import React, { useEffect, useState } from 'react';
import generateBoard from 'helpers/generateBoard';

export default function ShadowBoard() {
  // Todo: integrate pieces into each square created in board;
  const [state, setState] = useState({
    board: [],
  });

  useEffect(() => {
    const board = generateBoard();
    setState((prev) => ({ ...prev, board }));
  }, []);

  return <div className="shadow-board">{state.board}</div>;
}
