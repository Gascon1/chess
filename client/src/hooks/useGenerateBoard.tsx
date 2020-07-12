import React, { useState, useEffect } from 'react';
import isEven from 'helpers/isEven';
import Spot from 'components/Spot';

export function useGenerateBoard(tile: string, x: number, y: number) {
  const [state, setState] = useState({
    activePiece: {
      pieceType: '',
      color: '',
    },
    tileInfo: {
      tile: '',
      x: 0,
      y: 0,
    },
    isOccupied: false,
    isCircleVisible: false,
    hasUpdated: false,
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, tileInfo: { tile, x, y } }));
    if (tile.includes('2')) {
      setState((prev) => ({
        ...prev,
        activePiece: { pieceType: 'pawn', color: 'white' },
        isOccupied: true,
      }));
    } else if (tile.includes('7')) {
      setState((prev) => ({
        ...prev,
        activePiece: { pieceType: 'pawn', color: 'black' },
        isOccupied: true,
      }));
    }
    // Rook START
    else if (tile.includes('a8') || tile.includes('h8')) {
      setState((prev) => ({
        ...prev,
        activePiece: { pieceType: 'rook', color: 'black' },
        isOccupied: true,
      }));
    } else if (tile.includes('a1') || tile.includes('h1')) {
      setState((prev) => ({
        ...prev,
        activePiece: { pieceType: 'rook', color: 'white' },
        isOccupied: true,
      }));
    }
    // Rook END

    // Knight START
    else if (tile.includes('b8') || tile.includes('g8')) {
      setState((prev) => ({
        ...prev,
        activePiece: { pieceType: 'knight', color: 'black' },
        isOccupied: true,
      }));
    } else if (tile.includes('b1') || tile.includes('g1')) {
      setState((prev) => ({
        ...prev,
        activePiece: { pieceType: 'knight', color: 'white' },
        isOccupied: true,
      }));
    }
    // Knight END

    // Bishop START
    else if (tile.includes('c8') || tile.includes('f8')) {
      setState((prev) => ({
        ...prev,
        activePiece: { pieceType: 'bishop', color: 'black' },
        isOccupied: true,
      }));
    } else if (tile.includes('c1') || tile.includes('f1')) {
      setState((prev) => ({
        ...prev,
        activePiece: { pieceType: 'bishop', color: 'white' },
        isOccupied: true,
      }));
    }
    // Bishop END

    // Queen START
    else if (tile.includes('d8')) {
      setState((prev) => ({
        ...prev,
        activePiece: { pieceType: 'queen', color: 'black' },
        isOccupied: true,
      }));
    } else if (tile.includes('d1')) {
      setState((prev) => ({
        ...prev,
        activePiece: { pieceType: 'queen', color: 'white' },
        isOccupied: true,
      }));
    }
    // Queen END

    // King START
    else if (tile.includes('e8')) {
      setState((prev) => ({
        ...prev,
        activePiece: { pieceType: 'king', color: 'black' },
        isOccupied: true,
      }));
    } else if (tile.includes('e1')) {
      setState((prev) => ({
        ...prev,
        activePiece: { pieceType: 'king', color: 'white' },
        isOccupied: true,
      }));
    }

    // Very important for the global state of the spots
    setState((prev) => ({ ...prev, hasUpdated: true }));
  }, [tile, x, y]);

  return state;
}
