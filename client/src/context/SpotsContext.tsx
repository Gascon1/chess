import { createContext } from 'react';
import { stringify } from 'querystring';

export interface Spots {
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
}

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
  getSpotDetails: (x: number, y: number) => Spots;
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
  getSpotDetails: (x: number, y: number): Spots => ({
    activePiece: { pieceType: '', color: '' },
    tileInfo: { tile: '', x: 0, y: 0 },
    isOccupied: false,
    isCircleVisible: false,
  }),
};

export const SpotsContext = createContext(spotsDefaultValue);
