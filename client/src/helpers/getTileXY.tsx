import { Position } from 'components/Spot';

export const getTileXY = (tileInfo: Position) => {
  return {
    x: tileInfo.x,
    y: tileInfo.y,
  };
};
