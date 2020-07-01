import React from 'react';

interface Props {
  color: string;
  position: string;
  x: number;
  y: number;
}

export default function Spot(props: Props) {
  return (
    <div className={'square ' + props.color}>
      <span className="square-position">{props.position}</span>
    </div>
  );
}
