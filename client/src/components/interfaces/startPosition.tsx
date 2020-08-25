import Position from 'components/interfaces/position';

export default interface StartPosition extends Position {
  activePiece: {
    pieceType: string;
    color: string;
  };
}
