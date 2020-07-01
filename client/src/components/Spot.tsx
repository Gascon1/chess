import React from 'react';

export default function Spot(props: any) {
  return <button className={'square ' + props.color}></button>;
}
