import React from 'react';
import Pawn from 'components/pieces/Pawn';
import Rook from 'components/pieces/Rook';
import Queen from 'components/pieces/Queen';
import King from 'components/pieces/King';
import Bishop from 'components/pieces/Bishop';
import Knight from 'components/pieces/Knight';
import Board from 'components/Board';

function App() {
  return (
    <div className="board">
      <Rook />
      <Knight />
      <Bishop />
      <Queen />
      <King />
      <Bishop />
      <Knight />
      <Rook />
      <Pawn />
      <Board />
    </div>
  );
}

export default App;
