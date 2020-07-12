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
  getSpotDetails: (x: number, y: number) => SpotsContext | undefined;
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
  setSpotsContext: (spots: any) => {},
  initSpotsContext: (spots: any) => {},
  getSpotDetails: (x: number, y: number) => {},
};

export const SpotsContext = createContext(spotsDefaultValue);
