import { createContext } from 'react';

export interface SpotsContext {
  spots: {
    activePiece: {
      pieceType: string;
      color: string;
    };
    tileInfo: {
      tile: string;
      x: number;
      y: number;
    };
    isOccupied: boolean;
    isCircleVisible: boolean;
  };

  setSpotsContext: (spots: any) => void;
  initSpotsContext: (spots: any) => void;
}

export const spotsDefaultValue = {
  spots: [
    {
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
    },
  ],
  // setSpotsContext: ({ pieceType, color, tile, x, y, isOccupied, isCircleVisible }: any) => {},
  setSpotsContext: (spots: any) => {},
  initSpotsContext: (spots: any) => {},
};

export const SpotsContext = createContext(spotsDefaultValue);
