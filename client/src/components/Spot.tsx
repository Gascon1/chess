import React from 'react';

export default function Spot(props: any) {
  let labelColor = '';
  switch (props.color) {
    case 'red':
      labelColor = '#d7dae2';
      break;
    case 'grey':
      labelColor = '#a3524e';
  }
  let regex = /^[a-z]+$/;
  return (
    <button className={'square ' + props.color}>
      <span style={{ color: labelColor }} className={props.direction}>
        {props.label}
      </span>
    </button>
  );
}
