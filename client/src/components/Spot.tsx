import React from 'react';

export default function Spot(props: any) {
  return (
    <div className={'square ' + props.color}>
      <span className="square-position">{props.position}</span>
    </div>
  );
}
