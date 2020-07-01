import React from 'react';

interface Props {
  color: string;
  position: string;
}

export default function Spot(props: Props) {
  return (
    <div className={'square ' + props.color}>
      <span className="square-position">{props.position}</span>
    </div>
  );
}
